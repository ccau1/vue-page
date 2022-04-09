import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface HeaderProperties {
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<HeaderProperties>;
