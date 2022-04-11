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
export * from "./checkbox";
export * from "./datePicker";
export * from "./numberPicker";
export * from "./radio";
export * from "./text";
export declare let questionControls: {
    checkbox: import("./FormControl").default<import("./checkbox").CheckboxProperties>;
    datePicker: import("./FormControl").default<import("./datePicker").DatePickerProperties>;
    numberPicker: import("./FormControl").default<import("./numberPicker").NumberPickerProperties>;
    radio: import("./FormControl").default<import("./radio").RadioProperties>;
    text: import("./FormControl").default<import("./text").TextProperties>;
};
