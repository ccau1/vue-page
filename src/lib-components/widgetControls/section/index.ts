import Builder from "./Builder.vue";
import BuilderForm from "./BuilderForm.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import SectionWidgetItem from "./SectionWidgetItem";
import { WidgetControl } from "../..";

export interface SectionProperties {
  // the children that this section holds
  children: string[];
}

export default {
  display: Display,
  builder: Builder,
  builderForm: BuilderForm,
  readOnly: ReadOnly,
  widgetItem: SectionWidgetItem,
} as WidgetControl<SectionProperties>;
