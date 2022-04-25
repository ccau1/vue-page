import Builder from "./Builder.vue";
import BuilderControl from "./BuilderControl.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

export interface TextProperties {
  // the tag type to use
  tagType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default {
  display: Display,
  builder: Builder,
  builderControl: BuilderControl,
  readOnly: ReadOnly,
} as WidgetControl<TextProperties>;
