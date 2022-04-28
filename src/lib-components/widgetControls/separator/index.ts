import Builder from "./Builder.vue";
import BuilderForm from "./BuilderForm.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

export interface SeparatorProperties {
  dir: "vertical" | "horizontal";
  hasLabel?: boolean;
  labelPosition: "start" | "center" | "end";
}

export default {
  display: Display,
  builder: Builder,
  builderForm: BuilderForm,
  readOnly: ReadOnly,
} as WidgetControl<SeparatorProperties>;
