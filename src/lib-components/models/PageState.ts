export interface WidgetState {
  [widgetId: string]: any;
}

export interface PageStateCreate {
  widgetState?: WidgetState;
  interactiveState?: InteractiveState;
  widgetCodeToIdMap?: { [widgetCode: string]: string };
  reflexCodeToIdsMap?: { [widgetCode: string]: string[] };
  widgetIdToCodeMap?: { [widgetId: string]: string };
}

export interface PageStateRawObject {
  _widgetState: WidgetState;
  _interactiveState: InteractiveState;
  _widgetCodeToIdMap: { [widgetCode: string]: string };
  _widgetIdToCodeMap: { [widgetId: string]: string };
}

export interface InteractiveState {
  hoveredWidgetId?: string;
  selectedWidgetId?: string;
  draggingWidgetId?: string;
}

export class PageState {
  protected _widgetState: WidgetState;
  protected _interactiveState: InteractiveState;
  protected _widgetCodeToIdMap: { [widgetCode: string]: string };
  protected _widgetIdToCodeMap: { [widgetId: string]: string };

  static from(pageState: PageState | PageStateRawObject) {
    if (pageState instanceof PageState) {
      // from an object, use their public getters
      return new PageState({
        widgetState: pageState.widgetState,
        interactiveState: pageState.interactiveState,
        widgetCodeToIdMap: pageState.widgetCodeToIdMap,
        widgetIdToCodeMap: pageState.widgetIdToCodeMap,
      });
    } else {
      // assume it is just a plain object, fetch its protected
      // field
      return new PageState({
        widgetState: pageState._widgetState,
        interactiveState: pageState._interactiveState,
        widgetCodeToIdMap: pageState._widgetCodeToIdMap,
        widgetIdToCodeMap: pageState._widgetIdToCodeMap,
      });
    }
  }

  constructor({
    widgetState,
    interactiveState,
    widgetCodeToIdMap,
    widgetIdToCodeMap,
  }: PageStateCreate) {
    this._widgetState = widgetState || {};
    this._interactiveState = interactiveState || {};
    this._widgetCodeToIdMap = widgetCodeToIdMap || {};
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

  setWidgetState(widgetId: string, key: string | Object, value?: any) {
    if (!this._widgetState[widgetId]) this._widgetState[widgetId] = {};

    if (typeof key === 'string') {
      if (value === undefined) {
        delete this._widgetState[widgetId]?.[key];
      } else {
        this._widgetState[widgetId][key] = value;
      }
    } else if (typeof key === 'object') {
      this._widgetState[widgetId] = {
        ...this._widgetState[widgetId],
        ...key,
      };
    }

    // FIXME: this is not updating parent in App.vue
  }

  clearWidgetState(widgetId: string, key: string) {
    this.setWidgetState(widgetId, key);
  }

  registerWidgetCode(widgetCode: string, widgetId: string) {
    this._widgetCodeToIdMap[widgetCode] = widgetId;
    this._widgetIdToCodeMap[widgetId] = widgetCode;
    this.setWidgetState(widgetId, 'code', widgetCode);
  }

  unregisterWidgetCode(widgetCode: string) {
    delete this._widgetCodeToIdMap[widgetCode];
  }
}
