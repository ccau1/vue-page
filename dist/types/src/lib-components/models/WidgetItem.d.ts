import { PageConfig, ValidationOptions, ValidationRule, WidgetEffect, WidgetError } from '../interfaces';
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
    t: (key: string | string[], data?: {
        [key: string]: any;
    }) => string;
    getQuestionControls: () => {
        [key: string]: QuestionControl;
    };
    getWidgetMeta: () => {
        [key: string]: any;
    };
    getConfig: () => PageConfig;
    getValidator: () => Validator;
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
    protected _getWidgetMeta: () => {
        [key: string]: any;
    };
    protected _getConfig: () => PageConfig;
    protected _properties: Properties;
    protected _getValidator: () => Validator;
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
    get reflexiveRules(): (import("..").FormValidationCondition | import("..").FormValidationCondition[])[] | undefined;
    get validationRules(): {
        conditions: (import("..").FormValidationCondition | import("..").FormValidationCondition[])[];
        isWarning?: boolean | undefined;
        error: string;
    }[] | undefined;
    get widgetMeta(): {
        [key: string]: any;
    };
    get validator(): Validator;
    constructor({ widget, pageEventListener, removeWidget, emitEvent, getState, setState, onUpdate, t, getWidgetMeta, getConfig, getValidator, }: WidgetItemConstructorOptions);
    removeListenerSet(setName: string): void;
    setListenerSet(setName: string, events: string[], fn: Function): void;
    syncFetchPropertiesListeners(): void;
    syncValidationListeners(): void;
    syncReflexiveListeners(): void;
    callFetchPropertiesApi(): Promise<void>;
    setProperty(field: string, value: any): void;
    setEffectProperties(type: string, properties: any): void;
    update(): void;
    addEffect(effect: WidgetEffect): void;
    removeEffect(effectType: string): void;
    emitListener(name: string, data?: any): void;
    destroy(): void;
    toJSON(): Widget<Properties>;
    removeWidget(): void;
    setWidgetItems(widgetItems: WidgetItems): void;
    setLoading(isLoading: boolean): void;
    setDirty(dirty?: boolean): void;
    runValidations(opts?: ValidationOptions): Promise<WidgetError[] | null>;
    _getValidationErrors(): Promise<WidgetError[] | null>;
    addValidation(validation: ValidationRule): void;
    setChildLoading(childWidgetId: string, isLoading: boolean): void;
    childLoadings(): any;
    hasChildLoading(): boolean;
    setChildErrors(childWidgetId: string, errors: WidgetError[] | null): Promise<void>;
    childErrors(): any;
    hasChildErrors(): boolean;
    runReflexives(): Promise<void>;
    getResponsesByCodesOrIds(codesOrIds: string[]): {
        [widgetCode: string]: any;
    };
    get responses(): {
        [widgetKey: string]: any;
    };
    get validationFacts(): {
        [key: string]: any;
    };
    get reflexiveRulesFacts(): {
        [widgetCode: string]: any;
    };
    isReflexive(): Promise<boolean>;
    setState(key: string | Object, value?: any): void;
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
