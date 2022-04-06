import { WidgetControl } from "../..";
import SectionWidgetItem from "./SectionWidgetItem";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface SectionProperties {
  children: string[];
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: SectionWidgetItem,
} as WidgetControl<SectionProperties>;
