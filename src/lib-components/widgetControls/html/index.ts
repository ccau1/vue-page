import { WidgetControl } from "@/entry.esm";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface HtmlProperties {
  // whether it is storing in default language messages or from a url
  from: "default" | "url";
  // if html is from url, define url path
  url?: string;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<HtmlProperties>;
