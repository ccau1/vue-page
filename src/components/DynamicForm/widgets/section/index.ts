import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface SeparatorData {
  dir: "vertical" | "horizontal";
  hasLabel?: boolean;
  labelPosition: "start" | "center" | "end";
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<SeparatorData>;
