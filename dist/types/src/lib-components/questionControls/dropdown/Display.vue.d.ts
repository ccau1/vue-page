import { DropdownProperties, DropdownPropertiesOption, WidgetItem, WidgetError } from "../../../entry.esm";
import QuestionWidgetItem from "../../widgetControls/question/QuestionWidgetItem";
interface Option {
    label: string;
    value: string;
}
declare const _default: import("vue").ComponentOptions<import("../../../entry.esm").VuePage, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data> & {
    options: Array<Option>;
    attachedDependentCodeListeners: [name: string, fn: () => void][];
}, {
    setFilteredOptions(): Promise<void>;
    getFilteredOptions(): Promise<DropdownPropertiesOption[]>;
    onSelectChange(ev: Event): void;
}, {
    selectedValue(): Option | undefined;
}, {
    widgetItem: () => QuestionWidgetItem;
    properties: () => DropdownProperties;
    value: StringConstructor;
    widget: {
        type: () => WidgetItem<any>;
        required: true;
    };
    onChange: FunctionConstructor;
    t: {
        type: FunctionConstructor;
        required: true;
    };
    setWidgetState: FunctionConstructor;
    getWidgetState: FunctionConstructor;
    view: {
        type: StringConstructor;
        required: true;
    };
    errors: {
        type: () => WidgetError[];
        required: false;
    };
}, {
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    widgetItem?: QuestionWidgetItem<import("../../../entry.esm").QuestionItem> | undefined;
    properties?: DropdownProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}> & Omit<import("vue").VueConstructor<import("../../../entry.esm").VuePage>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    widgetItem?: QuestionWidgetItem<import("../../../entry.esm").QuestionItem> | undefined;
    properties?: DropdownProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<import("@vue/composition-api").Data>, {
    options: Array<Option>;
    attachedDependentCodeListeners: [name: string, fn: () => void][];
}, {
    selectedValue(): Option | undefined;
}, {
    setFilteredOptions(): Promise<void>;
    getFilteredOptions(): Promise<DropdownPropertiesOption[]>;
    onSelectChange(ev: Event): void;
}, {}, {}, {}, {
    widget: WidgetItem<any>;
    t: never;
    view: string;
} & {
    value?: string | undefined;
    widgetItem?: QuestionWidgetItem<import("../../../entry.esm").QuestionItem> | undefined;
    properties?: DropdownProperties | undefined;
    onChange?: Function | undefined;
    setWidgetState?: Function | undefined;
    getWidgetState?: Function | undefined;
    errors?: WidgetError[] | undefined;
}, {}, true>);
export default _default;
