import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface AlertProperties {
  type: "default" | "info" | "success" | "danger" | "warning" | "custom";
  customColor?: string;
  showCloseBtn?: boolean;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<AlertProperties>;
