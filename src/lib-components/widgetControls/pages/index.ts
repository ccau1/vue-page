import Builder from "./Builder.vue";
import Display from "./Display.vue";
import PagesWidgetItem from "./PagesWidgetItem";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

export interface PagesPropertiesPage {
  labelKey: string;
  idx?: number;
  children: string[];
}

export interface PagesProperties {
  // a list of pages, holding each page's label and children
  pages: Array<{
    labelKey: string;
    idx?: number;
    children: string[];
  }>;
  // whether navigation (back/forward) is visible
  navigationVisible?: boolean;
  // whether the tabs/steps should show
  tabsVisible?: boolean;
  // whether to show complete button
  hasCompleteButton?: boolean;
  // whether navigation also navigates children when possible
  navigationIntegrateChildrenPages?: boolean;
  // whether to detach from parent's integration so parent won't trigger this pages' navigation
  detachParentIntegration?: boolean;
}

export default {
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
  widgetItem: PagesWidgetItem,
} as WidgetControl<PagesProperties>;
