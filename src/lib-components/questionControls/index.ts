import radio from "./radio";
import checkbox from "./checkbox";
import numberPicker from "./numberPicker";
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

export default {
  radio,
  checkbox,
  numberPicker,
};
