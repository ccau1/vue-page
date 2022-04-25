declare const _default: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {}, {}, {
    position: {
        type: StringConstructor;
        default: string;
    };
    isOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    paneWidth: {
        type: NumberConstructor;
        default: number;
    };
}, {
    position: string;
    isOpen: boolean;
    paneWidth: number;
} & {}> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    position: string;
    isOpen: boolean;
    paneWidth: number;
} & {}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {}, {}, {}, {}, {
    position: string;
    isOpen: boolean;
    paneWidth: number;
} & {}, {
    position: string;
    isOpen: boolean;
    paneWidth: number;
}, true>);
export default _default;
