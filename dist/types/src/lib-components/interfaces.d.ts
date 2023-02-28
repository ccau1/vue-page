import { ConditionProperties, DynamicFactCallback, NestedCondition } from 'json-rules-engine';
import Vue, { VueConstructor } from 'vue';
import { PageState } from './models';
import { WidgetItem } from './models/WidgetItem';
export declare type FormValidationCondition = ConditionProperties | FormValidationTopLevelCondition | string;
export declare type FormValidationAllConditions = {
    all: Array<string | FormValidationCondition>;
};
export declare type FormValidationAnyConditions = {
    any: Array<string | FormValidationCondition>;
};
export declare type FormValidationTopLevelCondition = FormValidationAllConditions | FormValidationAnyConditions;
export declare let QuestionControlProps: {
    properties: {
        type: ObjectConstructor;
        required: true;
    };
    widget: {
        type: () => WidgetItem;
        required: true;
    };
    onChange: FunctionConstructor;
    value: {
        type: BooleanConstructor;
        required: true;
    };
    t: {
        type: FunctionConstructor;
        required: true;
    };
    setWidgetState: FunctionConstructor;
    getWidgetState: FunctionConstructor;
    view: {
        type: StringConstructor;
        required: true;
    };
    errors: {
        type: () => WidgetError[];
        required: false;
    };
};
export declare let WidgetControlProps: {
    widget: {
        type: () => WidgetItem;
        required: true;
    };
    widgetControls: {
        type: () => WidgetControls;
        required: true;
    };
    widgetItems: {
        type: () => WidgetItems;
        required: true;
    };
    pageState: {
        type: () => PageState;
        required: true;
    };
    setWidgetState: FunctionConstructor;
    getWidgetState: FunctionConstructor;
    view: {
        type: StringConstructor;
        required: true;
    };
    wrapperRef: {
        type: {
            new (): HTMLDivElement;
            prototype: HTMLDivElement;
        };
        required: true;
    };
    t: FunctionConstructor;
    properties: {
        type: ObjectConstructor;
        required: true;
    };
    onChange: FunctionConstructor;
    value: {
        type: StringConstructor;
    };
    errors: {
        type: () => WidgetError[];
        required: false;
    };
};
export interface RuleEngineFactDefinitions {
    [name: string]: DynamicFactCallback;
}
export interface RuleEngineRuleDefinitions {
    [name: string]: NestedCondition | NestedCondition[] | Function;
}
export interface PageConfigValidations {
    deps?: string[];
    rules?: RuleEngineRuleDefinitions;
    facts?: RuleEngineFactDefinitions;
}
export interface PageConfig {
    widgetsToExclude?: string[];
    widgetControls?: {
        disableInternalControls: boolean;
        blacklist: string[];
        whitelist: string[];
        filters: {
            [key: string]: any;
        };
    };
    questionControls?: {
        disableInternalControls: boolean;
        blacklist: string[];
        whitelist: string[];
        filters: {
            [key: string]: any;
        };
    };
    widgetEffectControls?: {
        disableInternalControls: boolean;
        blacklist: string[];
        whitelist: string[];
        filters: {
            [key: string]: any;
        };
    };
    meta?: {
        [key: string]: any;
    };
    validations?: PageConfigValidations;
}
export interface WidgetError {
    err: string;
    data?: {
        [key: string]: any;
    };
    isWarning?: boolean;
}
export declare type FormStepperPosition = 'top' | 'right' | 'bottom' | 'left' | 'center';
export declare type TranslateKey = string | TranslateKey[];
export declare type TranslateData = {
    [key: string]: any;
};
export interface WidgetEffect {
    type: string;
    properties: {
        [key: string]: any;
    };
}
export interface ValidationRule {
    conditions: FormValidationCondition[];
    error: string;
}
export declare type ValidationRules = ValidationRule[];
export interface Widget<WidgetProperties = any> {
    id: string;
    type: string;
    code?: string;
    parent?: string;
    style?: string;
    effects?: WidgetEffect[];
    fetchPropertiesOnWidgetsChange?: string[];
    fetchPropertiesApi?: string;
    reflexiveRules?: Array<FormValidationCondition | FormValidationCondition[] | string>;
    validationRules?: Array<{
        conditions: Array<FormValidationCondition | FormValidationCondition[] | string>;
        isWarning?: boolean;
        error: string;
    }>;
    order?: number;
    properties: WidgetProperties;
}
export interface WidgetControl<Data = any> {
    [key: string]: VueConstructor<Vue> | undefined | typeof WidgetItem | Function;
    readOnly: VueConstructor<Vue>;
    display: VueConstructor<Vue>;
    builder: VueConstructor<Vue>;
    builderControl?: VueConstructor<Vue>;
    builderForm?: VueConstructor<Vue>;
    widgetTree?: VueConstructor<Vue>;
    widgetItem?: typeof WidgetItem;
    create?: (props: any) => Widget;
    removeChild?: (options: {
        child: Widget;
        childId: string;
        widget: Widget<Data>;
    }) => WidgetItem<Data> | void;
    addChild?: (options: {
        child: WidgetItem;
        childId: string;
        widget: Widget<Data>;
        meta: {};
    }) => WidgetItem<Data> | void;
    getChildren?: (options: {
        widget: WidgetItem<Data>;
        widgetItems: WidgetItems;
        widgetControls: WidgetControls;
        deep?: boolean;
    }) => WidgetItem[];
}
export interface WidgetControls {
    [widgetType: string]: WidgetControl;
}
export interface WidgetItems {
    [widgetId: string]: WidgetItem;
}
export interface Page {
    widgets: Widget[];
}
export interface WidgetLanguage {
    id: string;
    refId: string;
    type: string;
    version: number;
    locale: string;
    message: {
        [key: string]: string;
    };
}
export interface BuilderWidgetLanguages {
    [widgetId: string]: {
        [locale: string]: WidgetLanguage;
    };
}
export interface ValidationOptions {
    setDirty?: boolean;
}
