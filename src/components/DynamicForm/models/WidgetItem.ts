import { Widget, WidgetItems } from "..";
import { FormState } from "./FormState";
import { Engine, ConditionProperties } from "json-rules-engine";

export default class WidgetItem<Data = any> {
  protected _widget: Widget<Data>;
  protected _getFormState: () => FormState;
  protected _setFormState: (newState: FormState) => void;
  protected _widgetItems: WidgetItems = {};

  static getParentIds(widgetId: string, widgetItems: WidgetItems): string[] {
    const widget = widgetItems[widgetId];
    if (!widget?.parentId) return [];
    return [
      widget.parentId,
      ...(WidgetItem.getParentIds(widget.parentId, widgetItems) || []),
    ];
  }

  constructor({
    widget,
    getState,
    setState,
  }: {
    widget: Widget;
    getState: () => FormState;
    setState: (newState: FormState) => void;
  }) {
    this._widget = widget;
    this._getFormState = getState;
    this._setFormState = setState;

    if (this.code) this.formState.registerWidgetCode(this.code, this.id);
    if (this.reflexives?.length) {
      this.formState.registerReflexWatch(
        this.id,
        this.reflexives.map((r) => r.fact)
      );
      // initial run
      this.runReflexives();
    }
  }

  destroyed() {
    if (this.reflexives?.length)
      this.formState.unregisterReflexWatch(
        this.id,
        this.reflexives.map((r) => r.fact)
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
    if (!this.validations?.length) {
      return null;
    }
    // get current widget's response
    const response = this.getState("response");

    // go through each validation, and return error string if
    // invalid, and null if valid.
    // Only store an array of errors
    const errors = (
      await Promise.all(
        this.validations.map(async (validation) => {
          const isValid = await this.validate(validation.conditions, {
            data: this.data,
            response,
          });
          if (!isValid) return validation.error;
          return null;
        })
      )
    ).filter((a) => a);
    // return error array or null
    return errors.length ? errors : null;
  }

  setChildErrors(childWidgetId: string, errors: string[]) {
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
    console.log("check child errors", this.childErrors());

    return Object.keys(this.childErrors() || {}).length > 0;
  }

  async runReflexives() {
    const isReflexive = await this.isReflexive();
    this.setState("reflexiveHide", !isReflexive);
  }

  async isReflexive() {
    if (!this.reflexives?.length) {
      return true;
    }

    return this.validate(
      this.reflexives,
      this.reflexives.reduce<{ [widgetCode: string]: any }>(
        (obj, reflexive) => {
          const widgetState = this.formState.widgetCodeToIdMap;
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

  get formState() {
    return this._getFormState();
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

  getChildrenIds(): string[] {
    // this can be used if overridden in widget control
    return [];
  }

  getChildren(): WidgetItem[] {
    return this.getChildrenIds().map((c) => this._widgetItems[c]);
  }

  get id() {
    return this._widget.id;
  }

  get type() {
    return this._widget.type;
  }

  get code() {
    return this._widget.code;
  }

  get data() {
    return this._widget.data;
  }

  get parentId() {
    return this._widget.parent;
  }

  getParent() {
    return this._widgetItems[this.parentId || ""] || null;
  }

  get reflexives() {
    return this._widget.reflexives;
  }

  get validations() {
    return this._widget.validations;
  }
}
