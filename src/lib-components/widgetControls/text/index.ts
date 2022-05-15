import { Widget, WidgetControl } from "../..";

import Builder from "./Builder.vue";
import BuilderControl from "./BuilderControl.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { v4 as uuidv4 } from "uuid";

export interface TextProperties {
  // the tag type to use
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small";
}

export default {
  create(props: Partial<TextProperties>): Widget<TextProperties> {
    return {
      id: uuidv4(),
      type: "text",
      properties: {
        tagType: "p",
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  builderControl: BuilderControl,
  readOnly: ReadOnly,
} as WidgetControl<TextProperties>;
