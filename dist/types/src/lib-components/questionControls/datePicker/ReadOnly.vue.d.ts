import { WidgetItem, WidgetError } from "../../../entry.esm";
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {}, {
    label(): string;
}, {
    properties: {
        type: ObjectConstructor;
        required: true;
    };
    widget: {
        type: () => WidgetItem<any>;
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
}, {
    properties: Record<string, any>;
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    properties: Record<string, any>;
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {
    label(): string;
}, {}, {}, {}, {}, {
    properties: Record<string, any>;
    widget: WidgetItem<any>;
    value: boolean;
    t: never;
    view: string;
} & {
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, {}, true>);
export default _default;
