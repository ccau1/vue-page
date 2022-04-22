import Builder from "./Builder.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

export interface SeparatorData {
  dir: "vertical" | "horizontal";
  hasLabel?: boolean;
  labelPosition: "start" | "center" | "end";
}

export default {
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
} as WidgetControl<SeparatorData>;
