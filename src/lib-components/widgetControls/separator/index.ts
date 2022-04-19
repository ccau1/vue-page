import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

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
