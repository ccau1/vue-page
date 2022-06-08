import { ConditionProperties } from "json-rules-engine";
import { ValidationRule, WidgetEffect, WidgetError } from "../interfaces";
import { Widget, WidgetItems } from "..";
import { PageEventListener } from "./PageEventListener";
import { PageState } from "./PageState";
export interface WidgetItemConstructorOptions {
    widget: Widget;
    pageEventListener: PageEventListener;
    removeWidget: (widgetId: string) => void;
    emitEvent: (name: string, value: any, widget: Widget) => Promise<void>;
    getState: () => PageState;
    setState: (newState: PageState) => void;
    onUpdate: (newWidgetItem: WidgetItem) => void;
    t: (key: string | string[], data?: {
        [key: string]: any;
    }) => string;
}
export declare class WidgetItem<Properties = any> {
    protected _widget: Widget<Properties>;
    protected _getPageState: () => PageState;
    protected _setPageState: (newState: PageState) => void;
    protected _widgetItems: WidgetItems;
    protected _update: (newWidgetItem?: WidgetItem<Properties>) => void;
    protected _t: (key: string | string[], data?: {
        [key: string]: any;
    }) => string;
    protected _emitEvent: (name: string, value: any, widget: WidgetItem) => Promise<void>;
    protected _pageEventListener: PageEventListener;
    protected _removeWidget: (widgetId: string) => void;
    protected _attachedListenerSets: {
        [setName: string]: {
            events: string[];
            fn: Function;
        };
    };
    protected _properties: Properties;
    static getParentIds(widgetId: string, widgetItems: WidgetItems): string[];
    get pageState(): PageState;
    emitEvent(name: string, value?: any): Promise<void>;
    get t(): (key: string | string[], data?: {
        [key: string]: any;
    } | undefined) => string;
    get id(): string;
    get order(): number | undefined;
    get widget(): Widget<Properties>;
    get effects(): WidgetEffect[] | undefined;
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
    constructor({ widget, pageEventListener, removeWidget, emitEvent, getState, setState, onUpdate, t, }: WidgetItemConstructorOptions);
    setListenerSet(setName: string, events: string[], fn: Function): void;
    syncFetchPropertiesListeners(): void;
    syncReflexiveListeners(): void;
    callFetchPropertiesApi(): Promise<void>;
    setProperty(field: string, value: any): void;
    setEffectProperties(type: string, properties: any): void;
    update(): void;
    addEffect(effect: WidgetEffect): void;
    removeEffect(effectType: string): void;
    emitListener(name: string, data: any): void;
    destroyed(): void;
    removeWidget(): void;
    setWidgetItems(widgetItems: WidgetItems): void;
    setLoading(isLoading: boolean): void;
    validate(conditions: ConditionProperties[], data: {
        [key: string]: any;
    }): Promise<boolean>;
    runValidations(): Promise<WidgetError[] | null>;
    _getValidationErrors(): Promise<WidgetError[] | null>;
    addValidation(validation: ValidationRule): void;
    setChildLoading(childWidgetId: string, isLoading: boolean): void;
    childLoadings(): any;
    hasChildLoading(): boolean;
    setChildErrors(childWidgetId: string, errors: WidgetError[] | null): void;
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
