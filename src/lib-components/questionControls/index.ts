import { WidgetItem } from "../models/WidgetItem";
import buttonGroup from "./buttonGroup";
import checkbox from "./checkbox";
import datePicker from "./datePicker";
import dropdown from "./dropdown";
import numberPicker from "./numberPicker";
import radio from "./radio";
import text from "./text";

export { default as QuestionControl } from "./QuestionControl";

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

export * from "./buttonGroup";
export * from "./checkbox";
export * from "./datePicker";
export * from "./dropdown";
export * from "./numberPicker";
export * from "./radio";
export * from "./text";

export let questionControls = {
  buttonGroup,
  checkbox,
  datePicker,
  dropdown,
  numberPicker,
  radio,
  text,
};
