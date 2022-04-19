import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface AlertProperties {
  // what type of alert is this (effects colors)
  type: "default" | "info" | "success" | "danger" | "warning" | "custom";
  // if type is 'custom', what color to show
  customColor?: string;
  // whether close button is shown
  showCloseBtn?: boolean;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<AlertProperties>;
