import { WidgetControl } from "@/entry.esm";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface HtmlProperties {
  from: "default" | "url";
  url?: string;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<HtmlProperties>;
