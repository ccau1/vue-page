import { WidgetItem } from "../../entry.esm";
import WidgetBreadcrumb from "./components/WidgetBreadcrumb.vue";
declare const _default: import("vue").ComponentOptions<WidgetBreadcrumb, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {}, {
    selectedWidgetItem(): WidgetItem | null;
}, {
    widgetItems: ObjectConstructor;
}, {} & {
    widgetItems?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<WidgetBreadcrumb>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    widgetItems?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {
    selectedWidgetItem(): WidgetItem | null;
}, {}, {}, {}, {}, {} & {
    widgetItems?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
