import { Widget, WidgetControl } from "@/entry.esm";

import Builder from "./Builder.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { v4 as uuidv4 } from "uuid";

export interface HtmlProperties {
  // whether it is storing in default language messages or from a url
  from: "default" | "url";
  // if html is from url, define url path
  url?: string;
}

export default {
  create(props: Partial<HtmlProperties>): Widget<HtmlProperties> {
    return {
      id: uuidv4(),
      type: "html",
      properties: {
        from: "default",
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
} as WidgetControl<HtmlProperties>;
