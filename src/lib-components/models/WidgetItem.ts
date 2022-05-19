import { ConditionProperties, Engine } from "json-rules-engine";
import { ValidationRule, WidgetEffect } from "../interfaces";
import { Widget, WidgetItems } from "..";

import { PageEventListener } from "./PageEventListener";
import { PageState } from "./PageState";

export class WidgetItem<Properties = any> {
  protected _widget: Widget<Properties>;
  protected _getPageState: () => PageState;
  protected _setPageState: (newState: PageState) => void;
  protected _widgetItems: WidgetItems;
  protected _update: (newWidgetItem?: WidgetItem<Properties>) => void;
  protected _emitEvent: (
    name: string,
    value: any,
    widget: WidgetItem
  ) => Promise<void>;
  protected _pageEventListener: PageEventListener;
  protected _removeWidget: (widgetId: string) => void;
  protected _attachedListenerSets: {
    [setName: string]: {
      events: string[];
      fn: Function;
    };
  } = {};
  protected _properties: Properties;

  static getParentIds(widgetId: string, widgetItems: WidgetItems): string[] {
    const widget = widgetItems[widgetId];
    if (!widget?.parentId) return [];
    return [
      widget.parentId,
      ...(WidgetItem.getParentIds(widget.parentId, widgetItems) || []),
    ];
  }

  get pageState() {
    return this._getPageState();
  }

  async emitEvent(name: string, value?: any): Promise<void> {
    return this._emitEvent(name, value, this);
  }

  get id() {
    return this._widget.id;
  }

  get order() {
    return this._widget.order;
  }

  get widget() {
    return this._widget;
  }

  get effects() {
    return this._widget.effects;
  }

  get type() {
    return this._widget.type;
  }

  get code() {
    return this._widget.code;
  }

  get style() {
    return this._widget.style;
  }

  get properties() {
    return this._properties;
  }

  get parentId() {
    return this._widget.parent;
  }

  get parent() {
    return this._widget.parent;
  }

  set parent(parentId: string | undefined) {
    this._widget.parent = parentId;
  }

  get reflexiveRules() {
    return this._widget.reflexiveRules;
  }

  get validationRules() {
    return this._widget.validationRules;
  }

  constructor({
    widget,
    pageEventListener,
    removeWidget,
    emitEvent,
    getState,
    setState,
    onUpdate,
  }: {
    widget: Widget;
    pageEventListener: PageEventListener;
    removeWidget: (widgetId: string) => void;
    emitEvent: (name: string, value: any, widget: Widget) => Promise<void>;
    getState: () => PageState;
    setState: (newState: PageState) => void;
    onUpdate: (newWidgetItem: WidgetItem) => void;
  }) {
    this._pageEventListener = pageEventListener;
    this._removeWidget = removeWidget;
    this._emitEvent = emitEvent;
    this._widgetItems = {};
    this._widget = widget;
    this._getPageState = getState;
    this._setPageState = setState;
    this._update = (newWidgetItem: WidgetItem = this) =>
      onUpdate(newWidgetItem);
    this._properties = widget.properties;

    if (this.code) getState().registerWidgetCode(this.code, this.id);

    this.syncReflexiveListeners();

    this.syncFetchPropertiesListeners();
  }

  setListenerSet(setName: string, events: string[], fn: Function) {
    if (this._attachedListenerSets[setName]) {
      // if setName exists, remove prior listeners
      this._attachedListenerSets[setName].events.forEach((eventName) => {
        this._pageEventListener.remove(
          eventName,
          this._attachedListenerSets[setName].fn
        );
      });
    } else {
      this._attachedListenerSets[setName] = { events: [], fn: () => null };
    }
    // if no events passed/defined, no point keeping this listener set,
    // so remove it and skip the rest
    if (!events?.length) {
      delete this._attachedListenerSets[setName];
      return;
    }
    // set new events & fn
    this._attachedListenerSets[setName].events = events;
    this._attachedListenerSets[setName].fn = fn;
    // add fn to event listener
    this._attachedListenerSets[setName].events.forEach((eventName) => {
      this._pageEventListener.add(
        eventName,
        this._attachedListenerSets[setName].fn
      );
    });
  }

  syncFetchPropertiesListeners() {
    this.setListenerSet(
      "fetchProperties",
      this.widget.fetchPropertiesOnWidgetsChange?.map((c) => `${c}_change`) ||
        [],
      async () => {
        await this.callFetchPropertiesApi();
      }
    );
  }

  syncReflexiveListeners() {
    this.setListenerSet(
      "reflexives",
      this.reflexiveRules?.map((c) => `${c.fact}_change`) || [],
      () => this.runReflexives()
    );
    // initial run
    this.runReflexives();
  }

  async callFetchPropertiesApi() {
    if (!this.widget.fetchPropertiesApi) {
      // TODO: throw error?
      return;
    }
    const body = {
      currentProperties: this.properties,
      originalProperties: this.widget.properties,
    };
    const propertiesResponse = await fetch(this.widget.fetchPropertiesApi, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!propertiesResponse.ok) {
      // TODO: fetch error, do something?
      return;
    }
    this._properties = await propertiesResponse.json();
  }

  setProperty(field: string, value: any) {
    this._widget.properties[field] = value;
    this._update(this);
  }

  setEffectProperties(type: string, properties: any) {
    this._widget.effects = (this.effects || []).map((eff) =>
      eff.type === type ? { ...eff, properties } : eff
    );
    this._update(this);
  }

  addEffect(effect: WidgetEffect) {
    if (!this.effects) this._widget.effects = [];
    if (this.effects?.some((e) => e.type === effect.type)) {
      // already exists? skip for now
      return;
    }
    // add effect to list of effects
    this.effects?.push(effect);
    // trigger update
    this._update();
  }

  removeEffect(effectType: string) {
    this._widget.effects = this._widget.effects?.filter(
      (e) => e.type !== effectType
    );
    this._update();
  }

  emitListener(name: string, data: any) {
    this._pageEventListener.emit(`${this.id}_${name}`, data, {
      widgetItem: this,
    });
    if (this.code) {
      this._pageEventListener.emit(`${this.code}_${name}`, data, {
        widgetItem: this,
      });
    }
  }

  destroyed() {}

  removeWidget() {
    // if there is a parent, let them know to remove you
    if (this.parentId) {
      this._widgetItems[this.parentId].removeChild(this);
    }
    // trigger destroyed method for clean up
    this.destroyed();
    // remove self
    this._removeWidget(this.id);
  }

  setWidgetItems(widgetItems: WidgetItems) {
    this._widgetItems = widgetItems;
  }

  async validate(
    conditions: ConditionProperties[],
    data: { [key: string]: any }
  ) {
    const engine = new Engine(undefined, { allowUndefinedFacts: true });
    engine.addRule({
      conditions: {
        all: conditions,
      },
      event: {
        type: "isTruthy",
      },
    });

    return (await engine.run(data)).events.some((e) => e.type === "isTruthy");
  }

  async runValidations() {
    // get errors (or null if none)
    const errors = await this._getValidationErrors();
    // save error to widgetState
    this.setState("errors", errors);
    this._setPageState(this.pageState);
    // update parent fields that they have children errors
    // TODO
    // return errors
    return errors;
  }

  async _getValidationErrors() {
    if (!this.validationRules?.length || !(await this.isReflexive())) {
      return null;
    }
    // get current widget's response
    const response = this.getState("response");

    // go through each validation, and return error string if
    // invalid, and null if valid.
    // Only store an array of errors
    const errors = (
      await Promise.all(
        this.validationRules.map(async (validation) => {
          const isValid = await this.validate(validation.conditions, {
            properties: this.properties,
            // FIXME: store somewhere so doesn't need to keep computing this?
            responses: Object.keys(this.pageState.widgetState).reduce<{
              [widgetKey: string]: any;
            }>((responses, wStateKey) => {
              const wState = this.pageState.widgetState[wStateKey];
              if (wState.type === "question") {
                responses[
                  this._widgetItems[wStateKey].code ||
                    this._widgetItems[wStateKey].id
                ] = wState.response;
              }

              return responses;
            }, {}),
            response:
              response === undefined || response === "" ? null : response,
          });
          if (!isValid) return validation.error;
          return null;
        })
      )
    ).filter((a) => a) as string[];
    // return error array or null
    return errors.length ? errors : null;
  }

  addValidation(validation: ValidationRule) {
    this.validationRules?.push(validation);
    this._update();
  }

  setChildErrors(childWidgetId: string, errors: string[] | null) {
    const currentChildErrors = this.getState("childErrors") || {};
    if (!errors) {
      delete currentChildErrors[childWidgetId];
    } else {
      currentChildErrors[childWidgetId] = errors;
    }

    if (!Object.keys(currentChildErrors).length) {
      this.setState("childErrors", undefined);
    } else {
      this.setState("childErrors", currentChildErrors);
    }
  }

  childErrors() {
    return this.getState("childErrors");
  }

  hasChildErrors() {
    return Object.keys(this.childErrors() || {}).length > 0;
  }

  async runReflexives() {
    const isHide = !(await this.isReflexive());
    const stateIsHide = !!this.getState("reflexiveHide");
    if (isHide !== stateIsHide) {
      await this.runValidations();
    }
    this.setState("reflexiveHide", isHide);
  }

  async isReflexive() {
    if (!this.reflexiveRules?.length) {
      return true;
    }

    return this.validate(
      this.reflexiveRules,
      this.reflexiveRules.reduce<{ [widgetCode: string]: any }>(
        (obj, reflexive) => {
          const widgetIdByCode =
            this.pageState.widgetCodeToIdMap[reflexive.fact];

          // TODO: what if I want to be more generic
          // and run rule by any param in widgetState and data
          const response = this.pageState.widgetState[widgetIdByCode]?.response;

          obj[reflexive.fact] = response;
          return obj;
        },
        {}
      )
    );
  }

  setState(key: string, value: any) {
    const state = this._getPageState();
    state.setWidgetState(this.id, key, value);
    // FIXME: hack to trigger re-render
    this._setPageState(this.pageState);
  }

  getState(key?: string) {
    const state = this._getPageState();

    return state.getWidgetState(this.id, key);
  }

  getParentIds() {
    return WidgetItem.getParentIds(this.id, this._widgetItems);
  }

  getParents() {
    return this.getParentIds().map((pId) => this._widgetItems[pId]);
  }

  getParent() {
    return this._widgetItems[this.parentId || ""] || null;
  }

  getChildrenIds(
    _opts?: { deep?: boolean },
    _meta?: { [key: string]: any }
  ): string[] {
    // this can be used if overridden in widget control
    return [];
  }

  getChildren(
    opts?: { deep?: boolean },
    meta?: { [key: string]: any }
  ): WidgetItem[] {
    return this.getChildrenIds(opts, meta).map((c) => this._widgetItems[c]);
  }

  addChild(childWidget: WidgetItem, _meta?: {}) {
    // to be overridden to handle adding to this widget as well
    childWidget.parent = this.id;
  }

  removeChild(childWidget: WidgetItem) {
    // to be overridden to handle removing in this widget
    childWidget.parent = undefined;
  }
}
