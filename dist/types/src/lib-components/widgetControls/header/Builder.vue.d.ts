declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {
    onTextChange(val: Event): void;
}, {}, {
    widget: {
        type: () => import("../../../entry.esm").WidgetItem<any>;
        required: true;
    };
    widgetControls: {
        type: () => import("../../../entry.esm").WidgetControls;
        required: true;
    };
    widgetItems: {
        type: () => import("../../../entry.esm").WidgetItems;
        required: true;
    };
    pageState: {
        type: () => import("../../../entry.esm").PageState;
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
        type: () => import("../../../entry.esm").WidgetError[];
        required: false;
    };
}, {
    widget: import("../../../entry.esm").WidgetItem<any>;
    widgetControls: import("../../../entry.esm").WidgetControls;
    widgetItems: import("../../../entry.esm").WidgetItems;
    pageState: import("../../../entry.esm").PageState;
    view: string;
    wrapperRef: HTMLDivElement;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: import("../../../entry.esm").WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    widget: import("../../../entry.esm").WidgetItem<any>;
    widgetControls: import("../../../entry.esm").WidgetControls;
    widgetItems: import("../../../entry.esm").WidgetItems;
    pageState: import("../../../entry.esm").PageState;
    view: string;
    wrapperRef: HTMLDivElement;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: import("../../../entry.esm").WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {
    onTextChange(val: Event): void;
}, {}, {}, {}, {
    widget: import("../../../entry.esm").WidgetItem<any>;
    widgetControls: import("../../../entry.esm").WidgetControls;
    widgetItems: import("../../../entry.esm").WidgetItems;
    pageState: import("../../../entry.esm").PageState;
    view: string;
    wrapperRef: HTMLDivElement;
    properties: Record<string, any>;
} & {
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    t?: Function | undefined;
    onChange?: Function | undefined;
    value?: string | undefined;
    errors?: import("../../../entry.esm").WidgetError[] | undefined;
}, {}, true>);
export default _default;
