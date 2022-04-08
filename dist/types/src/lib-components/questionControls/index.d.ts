import WidgetItem from "../models/WidgetItem";
export { default as FormControl } from "./FormControl";
export interface QuestionControlProps<Properties = {
    [key: string]: any;
}, Value = any> {
    value: Value;
    properties: Properties;
    widget: WidgetItem;
    onChange: (newVal: Value, ignoreChecks?: boolean) => void;
}
declare const _default: {
    radio: import("./FormControl").default<import("./radio").RadioProperties>;
    checkbox: import("./FormControl").default<import("./checkbox").CheckboxProperties>;
    numberPicker: import("./FormControl").default<import("./numberPicker").NumberPickerProperties>;
};
export default _default;
