import { WidgetItem } from "../models/WidgetItem";
export { default as QuestionControl } from "./QuestionControl";
export interface QuestionControlProps<Properties = {
    [key: string]: any;
}, Value = any> {
    value: Value;
    properties: Properties;
    widget: WidgetItem;
    onChange: (newVal: Value, ignoreChecks?: boolean) => void;
}
export * from "./buttonGroup";
export * from "./checkbox";
export * from "./datePicker";
export * from "./dropdown";
export * from "./numberPicker";
export * from "./radio";
export * from "./text";
export declare let questionControls: {
    buttonGroup: import("./QuestionControl").default<import("./buttonGroup").ButtonGroupProperties>;
    checkbox: import("./QuestionControl").default<import("./checkbox").CheckboxProperties>;
    datePicker: import("./QuestionControl").default<import("./datePicker").DatePickerProperties>;
    dropdown: import("./QuestionControl").default<import("./dropdown").DropdownProperties>;
    numberPicker: import("./QuestionControl").default<import("./numberPicker").NumberPickerProperties>;
    radio: import("./QuestionControl").default<import("./radio").RadioProperties>;
    text: import("./QuestionControl").default<import("./text").TextQuestionProperties>;
};
