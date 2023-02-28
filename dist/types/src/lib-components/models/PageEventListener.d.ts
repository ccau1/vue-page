import { WidgetItem } from './WidgetItem';
export declare class PageEventListener {
    protected _listenerFns: {
        [listenerKey: string]: Array<Function>;
    };
    protected _emitEvent: (name: string, value: any, widget?: WidgetItem<any> | undefined) => void;
    constructor(opts: {
        emitEvent: (name: string, value: any, widget?: WidgetItem) => void;
    });
    addChangeListener(widgetIdOrCode: string, fn: Function): void;
    add(listenerKey: string, fn: Function): void;
    remove(listenerKey: string, fn: Function): void;
    emit(listenerKey: string, value: any, opts?: {
        toExternal?: boolean;
        widgetItem?: WidgetItem;
    }): void;
}
