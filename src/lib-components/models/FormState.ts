export interface WidgetState {
  [widgetId: string]: any;
}

export interface FormStateCreate {
  widgetState?: WidgetState;
  interactiveState?: InteractiveState;
  widgetCodeToIdMap?: { [widgetCode: string]: string };
  reflexCodeToIdsMap?: { [widgetCode: string]: string[] };
  widgetIdToCodeMap?: { [widgetId: string]: string };
}

export interface FormStateRawObject {
  _widgetState: WidgetState;
  _interactiveState: InteractiveState;
  _widgetCodeToIdMap: { [widgetCode: string]: string };
  _reflexCodeToIdsMap: { [widgetCode: string]: string[] };
  _widgetIdToCodeMap: { [widgetId: string]: string };
}

export interface InteractiveState {
  hoveredWidgetId?: string;
  selectedWidgetId?: string;
  draggingWidgetId?: string;
}

export class FormState {
  protected _widgetState: WidgetState;
  protected _interactiveState: InteractiveState;
  protected _widgetCodeToIdMap: { [widgetCode: string]: string };
  protected _reflexCodeToIdsMap: { [widgetCode: string]: string[] };
  protected _widgetIdToCodeMap: { [widgetId: string]: string };

  static from(formState: FormState | FormStateRawObject) {
    if (formState instanceof FormState) {
      // from an object, use their public getters
      return new FormState({
        widgetState: formState.widgetState,
        interactiveState: formState.interactiveState,
        widgetCodeToIdMap: formState.widgetCodeToIdMap,
        reflexCodeToIdsMap: formState.reflexCodeToIdsMap,
        widgetIdToCodeMap: formState.widgetIdToCodeMap,
      });
    } else {
      // assume it is just a plain object, fetch its protected
      // field
      return new FormState({
        widgetState: formState._widgetState,
        interactiveState: formState._interactiveState,
        widgetCodeToIdMap: formState._widgetCodeToIdMap,
        reflexCodeToIdsMap: formState._reflexCodeToIdsMap,
        widgetIdToCodeMap: formState._widgetIdToCodeMap,
      });
    }
  }

  constructor({
    widgetState,
    interactiveState,
    widgetCodeToIdMap,
    reflexCodeToIdsMap,
    widgetIdToCodeMap,
  }: FormStateCreate) {
    this._widgetState = widgetState || {};
    this._interactiveState = interactiveState || {};
    this._widgetCodeToIdMap = widgetCodeToIdMap || {};
    this._reflexCodeToIdsMap = reflexCodeToIdsMap || {};
    this._widgetIdToCodeMap = widgetIdToCodeMap || {};
  }

  get interactiveState() {
    return this._interactiveState;
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

  get widgetIdToCodeMap() {
    return this._widgetIdToCodeMap;
  }

  getWidgetIdByCode(code: string) {
    return this._widgetCodeToIdMap[code];
  }

  getWidgetCodeById(widgetId: string) {
    return this._widgetIdToCodeMap[widgetId];
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
    this._widgetIdToCodeMap[widgetId] = widgetCode;
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
