import { ConditionProperties } from "json-rules-engine";
import { Widget, WidgetItems } from "..";
import { PageState } from "./PageState";
export declare class WidgetItem<Properties = any> {
    protected _widget: Widget<Properties>;
    protected _getPageState: () => PageState;
    protected _setPageState: (newState: PageState) => void;
    protected _widgetItems: WidgetItems;
    protected _onUpdate: (newWidgetItem: WidgetItem<Properties>) => void;
    protected _emitEvent: (name: string, value: any, widget: WidgetItem) => Promise<void>;
    protected _removeWidget: (widgetId: string) => void;
    static getParentIds(widgetId: string, widgetItems: WidgetItems): string[];
    get pageState(): PageState;
    emitEvent(name: string, value?: any): Promise<void>;
    get id(): string;
    get widget(): Widget<Properties>;
    get effects(): import("..").WidgetEffect[] | undefined;
    get type(): string;
    get code(): string | undefined;
    get style(): string | undefined;
    get properties(): Properties;
    get parentId(): string | undefined;
    get parent(): string | undefined;
    set parent(parentId: string | undefined);
    get reflexiveRules(): ConditionProperties[] | undefined;
    get validationRules(): {
        conditions: ConditionProperties[];
        error: string;
    }[] | undefined;
    constructor({ widget, removeWidget, emitEvent, getState, setState, onUpdate, }: {
        widget: Widget;
        removeWidget: (widgetId: string) => void;
        emitEvent: (name: string, value: any, widget: Widget) => Promise<void>;
        getState: () => PageState;
        setState: (newState: PageState) => void;
        onUpdate: (newWidgetItem: WidgetItem) => void;
    });
    destroyed(): void;
    removeWidget(): void;
    setWidgetItems(widgetItems: WidgetItems): void;
    validate(conditions: ConditionProperties[], data: {
        [key: string]: any;
    }): Promise<boolean>;
    runValidations(): Promise<string[] | null>;
    _getValidationErrors(): Promise<string[] | null>;
    setChildErrors(childWidgetId: string, errors: string[] | null): void;
    childErrors(): any;
    hasChildErrors(): boolean;
    runReflexives(): Promise<void>;
    isReflexive(): Promise<boolean>;
    setState(key: string, value: any): void;
    getState(key?: string): any;
    getParentIds(): string[];
    getParents(): WidgetItem<any>[];
    getParent(): WidgetItem<any>;
    getChildrenIds(_opts?: {
        deep?: boolean;
    }, _meta?: {
        [key: string]: any;
    }): string[];
    getChildren(opts?: {
        deep?: boolean;
    }, meta?: {
        [key: string]: any;
    }): WidgetItem[];
    addChild(childWidget: WidgetItem, _meta?: {}): void;
    removeChild(childWidget: WidgetItem): void;
}
