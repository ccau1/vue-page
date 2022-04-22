import Builder from "./Builder.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

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
  builder: Builder,
  readOnly: ReadOnly,
} as WidgetControl<AlertProperties>;
