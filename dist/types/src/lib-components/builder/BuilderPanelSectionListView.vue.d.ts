import BuilderPanelSectionView from "./BuilderPanelSectionView.vue";
declare const _default: import("vue").ComponentOptions<BuilderPanelSectionView, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    collapsed: {
        [sectionName: string]: boolean;
    };
}, {
    onToggleCollapse(sectionName: string, newIsCollapsed: boolean): void;
}, {}, {
    sections: ArrayConstructor;
    selectedWidgetItem: ObjectConstructor;
    widgetItems: ObjectConstructor;
}, {} & {
    sections?: unknown[] | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
    widgetItems?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<BuilderPanelSectionView>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    sections?: unknown[] | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
    widgetItems?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    collapsed: {
        [sectionName: string]: boolean;
    };
}, {}, {
    onToggleCollapse(sectionName: string, newIsCollapsed: boolean): void;
}, {}, {}, {}, {} & {
    sections?: unknown[] | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
    widgetItems?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
