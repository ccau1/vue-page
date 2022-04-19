import { WidgetControl } from "../..";
import SectionWidgetItem from "./SectionWidgetItem";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";

export interface SectionProperties {
  // the children that this section holds
  children: string[];
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: SectionWidgetItem,
} as WidgetControl<SectionProperties>;
