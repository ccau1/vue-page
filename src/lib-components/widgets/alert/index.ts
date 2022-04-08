import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

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
