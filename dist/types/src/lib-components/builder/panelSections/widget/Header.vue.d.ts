import { WidgetEffectControl } from "../../../../entry.esm";
declare const _default: import("vue").ComponentOptions<import("../../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    panelSections: {
        [key: string]: import("../PanelSection").default;
    };
}, {
    addValidation(): void;
}, {
    panelSectionsAvailable(): WidgetEffectControl<any>[];
}, {
    panelType: StringConstructor;
    widgetItems: ObjectConstructor;
    selectedWidgetItem: ObjectConstructor;
}, {} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    panelSections: {
        [key: string]: import("../PanelSection").default;
    };
}, {
    panelSectionsAvailable(): WidgetEffectControl<any>[];
}, {
    addValidation(): void;
}, {}, {}, {}, {} & {
    panelType?: string | undefined;
    widgetItems?: Record<string, any> | undefined;
    selectedWidgetItem?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
