import { WidgetItem } from "../../models/WidgetItem";
declare const _default: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & import("@vue/composition-api").Data, {
    setLabelPosition(labelPosition: 'start' | 'center' | 'end'): void;
}, {}, {
    widget: {
        type: typeof WidgetItem;
        required: true;
    };
}, {
    widget: WidgetItem<unknown>;
} & {}> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    widget: WidgetItem<unknown>;
} & {}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, import("@vue/composition-api").Data, {}, {
    setLabelPosition(labelPosition: 'start' | 'center' | 'end'): void;
}, {}, {}, {}, {
    widget: WidgetItem<unknown>;
} & {}, {}, true>);
export default _default;
