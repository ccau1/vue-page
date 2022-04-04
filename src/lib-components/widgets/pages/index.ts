import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import PagesWidgetItem from "./PagesWidgetItem";

export interface PagesDataPage {
  labelKey: string;
  idx?: number;
  children: string[];
}

export interface PagesData {
  pages: PagesDataPage[];
  navigationVisible?: boolean;
  navigationIntegrateParentPage?: boolean;
  tabsVisible?: boolean;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: PagesWidgetItem,
} as WidgetControl<PagesData>;
