import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";
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
  navigationIntegrateChildrenPages?: boolean;
  detachParentIntegration?: boolean;
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: PagesWidgetItem,
} as WidgetControl<PagesProperties>;
