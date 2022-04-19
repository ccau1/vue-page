import { WidgetControl } from "@/entry.esm";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface HtmlProperties {
  from: "default" | "url";
  url?: string;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<HtmlProperties>;
