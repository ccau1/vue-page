declare const _default: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    panelSections: {
        [key: string]: import("./panelSections/PanelSection").default;
    };
}, {
    onToggleCollapse(): void;
}, {}, {
    panelType: StringConstructor;
    widgetItems: ObjectConstructor;
    selectedWidgetItem: ObjectConstructor;
    isCollapsed: BooleanConstructor;
}, {
    isCollapsed: boolean;
} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    isCollapsed: boolean;
} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    panelSections: {
        [key: string]: import("./panelSections/PanelSection").default;
    };
}, {}, {
    onToggleCollapse(): void;
}, {}, {}, {}, {
    isCollapsed: boolean;
} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}, {
    isCollapsed: boolean;
}, true>);
export default _default;
