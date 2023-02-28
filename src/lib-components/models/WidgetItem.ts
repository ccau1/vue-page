import {
  PageConfig,
  ValidationOptions,
  ValidationRule,
  WidgetEffect,
  WidgetError,
} from '../interfaces';
import { QuestionControl, Widget, WidgetItems } from '..';

import { PageEventListener } from './PageEventListener';
import { PageState } from './PageState';
import Validator from './Validator';

export interface WidgetItemConstructorOptions {
  widget: Widget;
  pageEventListener: PageEventListener;
  removeWidget: (widgetId: string) => void;
  emitEvent: (name: string, value: any, widget: WidgetItem) => Promise<void>;
  getState: () => PageState;
  setState: (newState: PageState) => void;
  onUpdate: (newWidgetItem: WidgetItem) => void;
  t: (key: string | string[], data?: { [key: string]: any }) => string;
  getQuestionControls: () => { [key: string]: QuestionControl };
  getWidgetMeta: () => { [key: string]: any };
  getConfig: () => PageConfig;
  getValidator: () => Validator;
}

export class WidgetItem<Properties = any> {
  protected _widget: Widget<Properties>;
  protected _getPageState: () => PageState;
  protected _setPageState: (newState: PageState) => void;
  protected _widgetItems: WidgetItems;
  protected _update: (newWidgetItem?: WidgetItem<Properties>) => void;
  protected _t: (
    key: string | string[],
    data?: { [key: string]: any }
  ) => string;
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
  protected _getWidgetMeta: () => { [key: string]: any };
  protected _getConfig: () => PageConfig;
  protected _properties: Properties;
  protected _getValidator: () => Validator;

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

  get t() {
    return this._t;
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

  get widgetMeta() {
    return this._getWidgetMeta();
  }

  get validator(): Validator {
    return this._getValidator();
  }

  constructor({
    widget,
    pageEventListener,
    removeWidget,
    emitEvent,
    getState,
    setState,
    onUpdate,
    t,
    getWidgetMeta,
    getConfig,
    getValidator,
  }: WidgetItemConstructorOptions) {
    this._t = t;
    this._pageEventListener = pageEventListener;
    this._removeWidget = removeWidget;
    this._emitEvent = emitEvent;
    this._widgetItems = {};
    this._widget = (widget as WidgetItem).toJSON?.() || widget;
    this._getWidgetMeta = getWidgetMeta;
    this._getConfig = getConfig;
    this._getPageState = getState;
    this._setPageState = setState;
    this._update = (newWidgetItem: WidgetItem = this) =>
      onUpdate(newWidgetItem);
    this._properties = widget.properties;
    this._getValidator = getValidator;

    if (this.code) getState().registerWidgetCode(this.code, this.id);

    this.syncReflexiveListeners();

    this.syncValidationListeners();

    this.syncFetchPropertiesListeners();

    this.emitListener('change');
  }

  removeListenerSet(setName: string) {
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
  }

  setListenerSet(setName: string, events: string[], fn: Function) {
    // clear previous listeners
    this.removeListenerSet(setName);
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
      'fetchProperties',
      this.widget.fetchPropertiesOnWidgetsChange?.map((c) => `${c}_change`) ||
        [],
      async () => {
        await this.callFetchPropertiesApi();
      }
    );
  }

  syncValidationListeners() {
    this.setListenerSet(
      'validations',
      this.validationRules
        ?.reduce<string[]>(
          (arr, c) => [
            ...arr,
            ...(c.conditions || []).reduce<string[]>(
              (arr, cond) => [
                ...arr,
                ...this.validator
                  .getRuleFacts(
                    this.validator.getRuleConditions(
                      [cond].flat(1),
                      this.validationFacts
                    ),
                    this.validationFacts
                  )
                  .map((c) => `${c}_change`),
              ],
              []
            ),
          ],
          []
        )
        .filter((c) => c !== 'response') || [],
      () => this.runValidations()
    );
  }

  syncReflexiveListeners() {
    const reflexiveFacts = this.reflexiveRulesFacts;

    this.setListenerSet(
      'reflexives',
      this.validator
        .getRuleConditions(this.reflexiveRules?.flat(1) || [], reflexiveFacts)
        ?.reduce<string[]>(
          (arr, c) => [
            ...arr,
            ...this.validator
              .getRuleFacts(c, reflexiveFacts)
              .map((a) => `${a}_change`),
          ],
          []
        )
        .filter((c) => c !== 'response') || [],
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
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!propertiesResponse.ok) {
      // TODO: fetch error, do something?
      return;
    }
    this._properties = await propertiesResponse.json();
  }

  setProperty(field: string, value: any) {
    (this._widget.properties as { [key: string]: any })[field] = value;
    this.update();
  }

  setEffectProperties(type: string, properties: any) {
    // if effects was never instantiated, nothing to update, skip
    if (!this._widget.effects) return;

    // get effect index by type
    const effectIdx = this._widget.effects?.findIndex((e) => e.type === type);

    // if no effect was found with param type, just return
    if (effectIdx === -1) return;

    // update properties at effect idx
    this._widget.effects[effectIdx] = {
      ...this._widget.effects[effectIdx],
      properties,
    };

    // trigger update for widget in UI
    this.update();
  }

  update() {
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
    this.update();
  }

  removeEffect(effectType: string) {
    this._widget.effects = this._widget.effects?.filter(
      (e) => e.type !== effectType
    );
    this.update();
  }

  emitListener(name: string, data?: any) {
    this._pageEventListener.emit(`${this.id}_${name}`, data, {
      widgetItem: this,
    });
    if (this.code) {
      this._pageEventListener.emit(`${this.code}_${name}`, data, {
        widgetItem: this,
      });
    }
  }

  destroy() {}

  toJSON() {
    return this._widget;
  }

  removeWidget() {
    // if there is a parent, let them know to remove you
    if (this.parentId) {
      this._widgetItems[this.parentId].removeChild(this);
    }
    // trigger destroy method for clean up
    this.destroy();
    // remove self
    this._removeWidget(this.id);
  }

  setWidgetItems(widgetItems: WidgetItems) {
    this._widgetItems = widgetItems;
  }

  setLoading(isLoading: boolean) {
    this.setState('loading', isLoading);
    this.emitEvent('isLoading', isLoading);

    // go through all parent to notify
    this.getParents().forEach((parentWidgetItem) => {
      parentWidgetItem.setChildLoading(this.id, isLoading);
    });
  }

  setDirty(dirty = true) {
    this.setState({
      touched: dirty,
      pristine: !dirty,
      dirty,
    });

    this.update();
  }

  async runValidations(opts?: ValidationOptions) {
    if (opts?.setDirty) {
      this.setDirty();
    }

    // get errors (or null if none)
    let errors = await this._getValidationErrors();

    if (!errors?.length) errors = null;
    // save error to widgetState
    this.setState({
      errors: errors || [],
      valid: !errors,
      hasErrors: !!errors,
    });
    // update parent fields that they have children errors
    const parentIds = this.getParentIds();
    // go through each parent and notify them of children error changes
    (parentIds || []).forEach((parentId) => {
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });
    this.update();
    // return errors
    return errors;
  }

  async _getValidationErrors() {
    if (!this.validationRules?.length || !(await this.isReflexive())) {
      return null;
    }
    // get current widget's response
    const response = this.getState('response');

    // go through each validation, and return error string if
    // invalid, and null if valid.
    // Only store an array of errors

    const widgetResponses = this.responses;

    const genericData = await this.validator.generateValidateGenericData();

    const errors = (
      await Promise.all(
        this.validationRules.map<Promise<WidgetError | null>>(
          async (validation) => {
            const data = this.validator.sanitizeFacts({
              ...genericData,
              properties: this.properties,
              // FIXME: store somewhere so doesn't need to keep computing this?
              ...widgetResponses,
              response:
                response === undefined || response === '' ? null : response,
            });

            const conditions = validation.conditions
              .map((c) => this.validator.getRuleConditions(c, data))
              .flat(2);

            const isValid = await this.validator.validate(conditions, data);

            // TODO: need to handle possible data to go with err message
            if (!isValid)
              return { err: validation.error, isWarning: validation.isWarning };
            return null;
          }
        )
      )
    ).filter((a) => a) as WidgetError[];
    // return error array or null
    return errors.length ? errors : null;
  }

  addValidation(validation: ValidationRule) {
    this.validationRules?.push(validation);
    this.update();
  }

  setChildLoading(childWidgetId: string, isLoading: boolean) {
    const currentChildLoadings = this.getState('childLoadings') || {};
    if (!isLoading) {
      delete currentChildLoadings[childWidgetId];
    } else {
      currentChildLoadings[childWidgetId] = isLoading;
    }

    if (!Object.keys(currentChildLoadings).length) {
      this.setState('childLoadings', undefined);
    } else {
      this.setState('childLoadings', currentChildLoadings);
    }
  }

  childLoadings() {
    return this.getState('childLoadings');
  }

  hasChildLoading() {
    return Object.keys(this.childLoadings() || {}).length > 0;
  }

  async setChildErrors(childWidgetId: string, errors: WidgetError[] | null) {
    const originalChildErrors = this.getState('childErrors') || {};
    const currentChildErrors = { ...this.getState('childErrors') } || {};
    if (!errors) {
      delete currentChildErrors[childWidgetId];
    } else {
      currentChildErrors[childWidgetId] = errors;
    }

    // nothing to set, just return
    if (
      Object.keys(currentChildErrors).length ===
        Object.keys(originalChildErrors).length &&
      Object.keys(currentChildErrors).every(
        (key) => originalChildErrors[key] === currentChildErrors[key]
      )
    ) {
      return;
    }

    if (!Object.keys(currentChildErrors).length) {
      this.setState('childErrors', undefined);
    } else {
      this.setState('childErrors', currentChildErrors);
    }
  }

  childErrors() {
    return this.getState('childErrors');
  }

  hasChildErrors() {
    return Object.keys(this.childErrors() || {}).length > 0;
  }

  async runReflexives() {
    const isHide = !(await this.isReflexive());
    const stateIsHide = !!this.getState('reflexiveHide');
    if (isHide !== stateIsHide) {
      await this.runValidations();
      this.setState('reflexiveHide', isHide);
    }
    if (isHide) {
      this.setState({ response: null });
    }
  }

  getResponsesByCodesOrIds(codesOrIds: string[]) {
    return codesOrIds.reduce<{ [widgetCode: string]: any }>((obj, codeOrId) => {
      const widgetIdByCode = this.pageState.widgetCodeToIdMap[codeOrId];

      // TODO: what if I want to be more generic
      // and run rule by any param in widgetState and data
      const response = this.pageState.widgetState[widgetIdByCode]?.response;

      obj[codeOrId] = response;
      return obj;
    }, {});
  }

  get responses() {
    if (!Object.keys(this._widgetItems).length) {
      return {};
    }
    return Object.keys(this.pageState.widgetState).reduce<{
      [widgetKey: string]: any;
    }>((responses, wStateKey) => {
      const wState = this.pageState.widgetState[wStateKey];
      if (wState.type === 'question' && this._widgetItems[wStateKey]) {
        responses[
          this._widgetItems[wStateKey]?.code || this._widgetItems[wStateKey]?.id
        ] = wState.response;
      }

      return responses;
    }, {});
  }

  get validationFacts() {
    return Validator.sanitizeFacts({
      ...Validator.generateValidateGenericData(),
      ...this.responses,
    });
  }

  get reflexiveRulesFacts() {
    return this.getResponsesByCodesOrIds(
      (this.reflexiveRules || []).reduce<string[]>(
        (arr, rule) => [
          ...arr,
          ...this.validator.getRuleFacts(rule, this.responses),
        ],
        []
      )
    );
  }

  async isReflexive(): Promise<boolean> {
    if (!this.reflexiveRules?.length) {
      return true;
    }

    // extract all rules from reflexiveRules
    const rules = this.reflexiveRules
      .map((r) => this.validator.getRuleConditions(r, this.validationFacts))
      .flat(2);

    // go through each reflexive rule to generate
    // a list of variable dependencies
    const facts = this.reflexiveRulesFacts;

    // validate reflexive rules
    const isReflexive = await this.validator.validate(rules, facts);

    const stateIsHide = !!this.getState('reflexiveHide');

    if (isReflexive === stateIsHide) {
      this.setState('reflexiveHide', !isReflexive);
    }

    return isReflexive;
  }

  setState(key: string | Object, value?: any) {
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
    return this._widgetItems[this.parentId || ''] || null;
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
