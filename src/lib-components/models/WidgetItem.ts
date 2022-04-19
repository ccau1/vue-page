import { Widget, WidgetItems } from "..";
import { FormState } from "./FormState";
import { Engine, ConditionProperties } from "json-rules-engine";

export default class WidgetItem<Properties = any> {
  protected _widget: Widget<Properties>;
  protected _getFormState: () => FormState;
  protected _setFormState: (newState: FormState) => void;
  protected _widgetItems: WidgetItems;
  protected _onUpdate: (newWidgetItem: WidgetItem<Properties>) => void;

  static getParentIds(widgetId: string, widgetItems: WidgetItems): string[] {
    const widget = widgetItems[widgetId];
    if (!widget?.parentId) return [];
    return [
      widget.parentId,
      ...(WidgetItem.getParentIds(widget.parentId, widgetItems) || []),
    ];
  }

  get formState() {
    return this._getFormState();
  }

  get id() {
    return this._widget.id;
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
    return this._widget.properties;
  }

  get parentId() {
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
    getState,
    setState,
    onUpdate,
  }: {
    widget: Widget;
    getState: () => FormState;
    setState: (newState: FormState) => void;
    onUpdate: (newWidgetItem: WidgetItem) => void;
  }) {
    this._widgetItems = {};
    this._widget = widget;
    this._getFormState = getState;
    this._setFormState = setState;
    this._onUpdate = onUpdate;

    if (this.code) getState().registerWidgetCode(this.code, this.id);
    if (this.reflexiveRules?.length) {
      this.formState.registerReflexWatch(
        this.id,
        this.reflexiveRules.map((r) => r.fact)
      );
      // initial run
      this.runReflexives();
    }
  }

  destroyed() {
    if (this.reflexiveRules?.length)
      this.formState.unregisterReflexWatch(
        this.id,
        this.reflexiveRules.map((r) => r.fact)
      );
  }

  setWidgetItems(widgetItems: WidgetItems) {
    this._widgetItems = widgetItems;
  }

  async validate(
    conditions: ConditionProperties[],
    data: { [key: string]: any }
  ) {
    const engine = new Engine();
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
    this._setFormState(this.formState);
    // update parent fields that they have children errors
    // TODO
    // return errors
    return errors;
  }

  async _getValidationErrors() {
    if (!this.validationRules?.length) {
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
            data: this.properties,
            response,
          });
          if (!isValid) return validation.error;
          return null;
        })
      )
    ).filter((a) => a) as string[];
    // return error array or null
    return errors.length ? errors : null;
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
    const isReflexive = await this.isReflexive();
    this.setState("reflexiveHide", !isReflexive);
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
            this.formState.widgetCodeToIdMap[reflexive.fact];

          // TODO: what if I want to be more generic
          // and run rule by any param in widgetState and data
          const response = this.formState.widgetState[widgetIdByCode]?.response;

          obj[reflexive.fact] = response;
          return obj;
        },
        {}
      )
    );
  }

  setState(key: string, value: any) {
    const state = this._getFormState();
    state.setWidgetState(this.id, key, value);
    // FIXME: hack to trigger re-render
    this._setFormState(this.formState);
  }

  getState(key?: string) {
    const state = this._getFormState();

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
