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
    widget: ObjectConstructor;
    properties: ObjectConstructor;
}, {} & {
    widget?: Record<string, any> | undefined;
    properties?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    widget?: Record<string, any> | undefined;
    properties?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    isOpen: boolean;
}, {
    alertStyles(): {
        [cssProp: string]: string | number;
    };
}, {
    onCloseAlert(): void;
    updateText(name: string, text: string): void;
}, {}, {}, {}, {} & {
    widget?: Record<string, any> | undefined;
    properties?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
