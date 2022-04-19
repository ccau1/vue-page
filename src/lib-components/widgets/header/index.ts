import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface HeaderProperties {
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<HeaderProperties>;
