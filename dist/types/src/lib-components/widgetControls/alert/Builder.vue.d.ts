import { WidgetError, WidgetItem, WidgetItems, WidgetControls, PageState } from "../../../entry.esm";
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    isOpen: boolean;
}, {
    onCloseAlert(): void;
    updateText(name: string, text: string): void;
}, {
    alertStyles(): {
        [cssProp: string]: string | number;
    };
}, {
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
}, {
    widget: WidgetItem<any>;
    widgetControls: WidgetControls;
    widgetItems: WidgetItems;
    pageState: PageState;
    view: string;
    wrapperRef: HTMLDivElement;
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
    wrapperRef: HTMLDivElement;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    isOpen: boolean;
}, {
    alertStyles(): {
        [cssProp: string]: string | number;
    };
}, {
    onCloseAlert(): void;
    updateText(name: string, text: string): void;
}, {}, {}, {}, {
    widget: WidgetItem<any>;
    widgetControls: WidgetControls;
    widgetItems: WidgetItems;
    pageState: PageState;
    view: string;
    wrapperRef: HTMLDivElement;
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
