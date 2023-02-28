import { CheckboxProperties, WidgetItem, WidgetError } from "../../../entry.esm";
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {
    onToggle(ev: Event): void;
}, {}, {
    properties: () => CheckboxProperties;
    widget: {
        type: () => WidgetItem<any>;
        required: true;
    };
    onChange: FunctionConstructor;
    value: {
        type: BooleanConstructor;
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
}, {
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    properties?: CheckboxProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    properties?: CheckboxProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {
    onToggle(ev: Event): void;
}, {}, {}, {}, {
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    properties?: CheckboxProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, {
    value: boolean;
}, true>);
export default _default;
