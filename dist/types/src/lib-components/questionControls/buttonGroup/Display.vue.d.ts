import { ButtonGroupProperties, WidgetItem, WidgetError } from "../../../entry.esm";
interface Option {
    label: string;
    value: string;
}
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    options: Option[];
}, {
    onSelectChange(value: string): void;
}, {
    selectedValue(): Option | undefined;
}, {
    properties: {
        type: () => ButtonGroupProperties;
        required: true;
    };
    value: {
        type: StringConstructor;
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
    properties: ButtonGroupProperties;
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
    properties: ButtonGroupProperties;
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    options: Option[];
}, {
    selectedValue(): Option | undefined;
}, {
    onSelectChange(value: string): void;
}, {}, {}, {}, {
    properties: ButtonGroupProperties;
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
