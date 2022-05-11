import { WidgetItem } from "../models/WidgetItem";
import { WidgetItems } from "../interfaces";
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
  Value = any,
  WI = WidgetItem
> {
  value: Value;
  properties: Properties;
  widget: WI;
  widgetItems: WidgetItems;
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
