import { WidgetItem } from "../../models";
import { WidgetControls, WidgetItems, PageState, WidgetError } from "../../../entry.esm";
declare type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {
    setTagType(type: TagType): void;
}, {}, {
    widget: {
        type: () => WidgetItem<any>;
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
}, {
    widget: WidgetItem<any>;
    widgetControls: WidgetControls;
    widgetItems: WidgetItems;
    pageState: PageState;
    view: string;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    widget: WidgetItem<any>;
    widgetControls: WidgetControls;
    widgetItems: WidgetItems;
    pageState: PageState;
    view: string;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {
    setTagType(type: TagType): void;
}, {}, {}, {}, {
    widget: WidgetItem<any>;
    widgetControls: WidgetControls;
    widgetItems: WidgetItems;
    pageState: PageState;
    view: string;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: WidgetError[] | undefined;
}, {}, true>);
export default _default;
