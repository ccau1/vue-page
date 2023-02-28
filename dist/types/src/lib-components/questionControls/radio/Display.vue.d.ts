import { WidgetItem, WidgetError } from "../../../entry.esm";
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {
    onSelect(ev: Event): void;
}, {}, {
    value: StringConstructor;
    properties: {
        type: ObjectConstructor;
        required: true;
    };
    widget: {
        type: () => WidgetItem<any>;
        required: true;
    };
    onChange: FunctionConstructor;
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
    t: never;
    view: string;
} & {
    value?: string | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    properties: Record<string, any>;
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {
    onSelect(ev: Event): void;
}, {}, {}, {}, {
    properties: Record<string, any>;
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, {}, true>);
export default _default;
