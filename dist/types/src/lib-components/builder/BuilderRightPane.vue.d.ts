import { WidgetItem } from '../models/WidgetItem';
import Pane from './components/Pane.vue';
declare const _default: import("vue").ComponentOptions<Pane, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    panelSections: {
        [key: string]: import("./panelSections/PanelSection").default;
    };
}, {}, {
    selectedWidgetItem(): WidgetItem;
}, {
    widgetItems: ObjectConstructor;
}, {} & {
    widgetItems?: Record<string, any> | undefined;
}> & Omit<import("vue").VueConstructor<Pane>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    widgetItems?: Record<string, any> | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    panelSections: {
        [key: string]: import("./panelSections/PanelSection").default;
    };
}, {
    selectedWidgetItem(): WidgetItem;
}, {}, {}, {}, {}, {} & {
    widgetItems?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
