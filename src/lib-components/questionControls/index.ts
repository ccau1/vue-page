import checkbox from "./checkbox";
import datePicker from "./datePicker";
import numberPicker from "./numberPicker";
import radio from "./radio";
import text from "./text";
import WidgetItem from "../models/WidgetItem";

export { default as FormControl } from "./FormControl";

export interface QuestionControlProps<
  Properties = {
    [key: string]: any;
  },
  Value = any
> {
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

export let questionControls = {
  checkbox,
  datePicker,
  numberPicker,
  radio,
  text,
};
