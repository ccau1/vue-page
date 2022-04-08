import { Widget, WidgetItems } from "..";
import { FormState } from "./FormState";
import { ConditionProperties } from "json-rules-engine";
export default class WidgetItem<Properties = any> {
    protected _widget: Widget<Properties>;
    protected _getFormState: () => FormState;
    protected _setFormState: (newState: FormState) => void;
    protected _widgetItems: WidgetItems;
    protected _onUpdate: (newWidgetItem: WidgetItem<Properties>) => void;
    static getParentIds(widgetId: string, widgetItems: WidgetItems): string[];
    get formState(): FormState;
    get id(): string;
    get type(): string;
    get code(): string | undefined;
    get style(): string | undefined;
    get properties(): Properties;
    get parentId(): string | undefined;
    set parent(parentId: string | undefined);
    get reflexiveRules(): ConditionProperties[] | undefined;
    get validationRules(): {
        conditions: ConditionProperties[];
        error: string;
    }[] | undefined;
    constructor({ widget, getState, setState, onUpdate, }: {
        widget: Widget;
        getState: () => FormState;
        setState: (newState: FormState) => void;
        onUpdate: (newWidgetItem: WidgetItem) => void;
    });
    destroyed(): void;
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
