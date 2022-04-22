import Builder from "./Builder.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "@/entry.esm";

export interface HtmlProperties {
  // whether it is storing in default language messages or from a url
  from: "default" | "url";
  // if html is from url, define url path
  url?: string;
}

export default {
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
} as WidgetControl<HtmlProperties>;
