import Pane from './components/Pane.vue';
import { WidgetItem } from "../../entry.esm";
declare const _default: import("vue").ComponentOptions<Pane, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    panelSections: {
        [key: string]: import("./panelSections/PanelSection").default;
    };
    sections: string[];
    selectedSection: string;
}, {
    setSelectedSection(selectedSection: string): void;
}, {
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
    sections: string[];
    selectedSection: string;
}, {
    selectedWidgetItem(): WidgetItem;
}, {
    setSelectedSection(selectedSection: string): void;
}, {}, {}, {}, {} & {
    widgetItems?: Record<string, any> | undefined;
}, {}, true>);
export default _default;
