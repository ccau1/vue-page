import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import PagesWidgetItem from "./PagesWidgetItem";

export interface PagesPropertiesPage {
  labelKey: string;
  idx?: number;
  children: string[];
}

export interface PagesProperties {
  pages: PagesPropertiesPage[];
  navigationVisible?: boolean;
  navigationIntegrateParentPage?: boolean;
  tabsVisible?: boolean;
  hasCompleteButton?: boolean;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: PagesWidgetItem,
} as WidgetControl<PagesProperties>;
