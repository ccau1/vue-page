import { WidgetItem } from './WidgetItem';

export class PageEventListener {
  protected _listenerFns: {
    [listenerKey: string]: Array<Function>;
  } = {};

  protected _emitEvent;

  constructor(opts: {
    emitEvent: (name: string, value: any, widget?: WidgetItem) => void;
  }) {
    this._emitEvent = opts.emitEvent;
  }

  addChangeListener(widgetIdOrCode: string, fn: Function) {
    this.add(`${widgetIdOrCode}_change`, fn);
  }

  add(listenerKey: string, fn: Function) {
    if (!this._listenerFns[listenerKey]) this._listenerFns[listenerKey] = [];
    this._listenerFns[listenerKey].push(fn);
  }

  remove(listenerKey: string, fn: Function) {
    if (!this._listenerFns[listenerKey]) return;
    this._listenerFns[listenerKey] = this._listenerFns[listenerKey].filter(
      (f) => f !== fn
    );
  }

  emit(
    listenerKey: string,
    value: any,
    opts?: { toExternal?: boolean; widgetItem?: WidgetItem }
  ) {
    (this._listenerFns[listenerKey] || []).forEach((fn) => fn());
    if (opts?.toExternal) {
      this._emitEvent(listenerKey, value, opts.widgetItem);
    }
  }
}
