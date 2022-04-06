export interface WidgetState {
  [widgetId: string]: any;
}

export interface FormStateCreate {
  widgetState?: WidgetState;
  widgetCodeToIdMap?: { [widgetCode: string]: string };
  reflexCodeToIdsMap?: { [widgetCode: string]: string[] };
}

export interface FormStateRawObject {
  _widgetState: WidgetState;
  _widgetCodeToIdMap: { [widgetCode: string]: string };
  _reflexCodeToIdsMap: { [widgetCode: string]: string[] };
}

export class FormState {
  protected _widgetState: WidgetState = {};
  protected _widgetCodeToIdMap: { [widgetCode: string]: string } = {};
  protected _reflexCodeToIdsMap: { [widgetCode: string]: string[] } = {};

  static from(formState: FormState | FormStateRawObject) {
    if (formState instanceof FormState) {
      // from an object, use their public getters
      return new FormState({
        widgetState: formState.widgetState,
        widgetCodeToIdMap: formState.widgetCodeToIdMap,
        reflexCodeToIdsMap: formState.reflexCodeToIdsMap,
      });
    } else {
      // assume it is just a plain object, fetch its protected
      // field
      return new FormState({
        widgetState: formState._widgetState,
        widgetCodeToIdMap: formState._widgetCodeToIdMap,
        reflexCodeToIdsMap: formState._reflexCodeToIdsMap,
      });
    }
  }

  constructor({
    widgetState,
    widgetCodeToIdMap,
    reflexCodeToIdsMap,
  }: FormStateCreate) {
    this._widgetState = widgetState || {};
    this._widgetCodeToIdMap = widgetCodeToIdMap || {};
    this._reflexCodeToIdsMap = reflexCodeToIdsMap || {};
  }

  get widgetState() {
    return this._widgetState;
  }

  get widgetCodeToIdMap() {
    return this._widgetCodeToIdMap;
  }

  get reflexCodeToIdsMap() {
    return this._reflexCodeToIdsMap;
  }

  onUpdate() {}

  getWidgetState(widgetId: string, key?: string) {
    return key
      ? this._widgetState[widgetId]?.[key]
      : this._widgetState[widgetId];
  }

  setWidgetState(widgetId: string, key: string, value?: any) {
    if (!this._widgetState[widgetId]) this._widgetState[widgetId] = {};

    if (value === undefined) {
      delete this._widgetState[widgetId]?.[key];
    } else {
      this._widgetState[widgetId][key] = value;
    }

    // FIXME: this is not updating parent in App.vue
  }

  clearWidgetState(widgetId: string, key: string) {
    this.setWidgetState(widgetId, key);
  }

  registerWidgetCode(widgetCode: string, widgetId: string) {
    this._widgetCodeToIdMap[widgetCode] = widgetId;
    this.setWidgetState(widgetId, "code", widgetCode);
  }

  unregisterWidgetCode(widgetCode: string) {
    delete this._widgetCodeToIdMap[widgetCode];
  }

  getReflexWidgetIdsByCode(widgetCode: string) {
    return this._reflexCodeToIdsMap[widgetCode] || [];
  }

  registerReflexWatch(widgetId: string, reflexCodes: string[]) {
    reflexCodes.forEach((code) => {
      this._reflexCodeToIdsMap[code] = [
        ...new Set([...(this._reflexCodeToIdsMap[code] || []), widgetId]),
      ];
    });
  }
  unregisterReflexWatch(widgetId: string, reflexCodes: string[]) {
    reflexCodes.forEach((rc) => {
      this._reflexCodeToIdsMap[rc] = this._reflexCodeToIdsMap[rc].filter(
        (f) => f !== widgetId
      );
    });
  }
}
