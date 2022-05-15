import { Widget, WidgetControl } from "../..";

import Builder from "./Builder.vue";
import Display from "./Display.vue";
import PagesWidgetItem from "./PagesWidgetItem";
import ReadOnly from "./ReadOnly.vue";
import { v4 as uuidv4 } from "uuid";

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
  create(props: Partial<PagesProperties>): Widget<PagesProperties> {
    return {
      id: uuidv4(),
      type: "pages",
      properties: {
        pages: [{ labelKey: "", children: [] }],
        navigationVisible: true,
        tabsVisible: true,
        hasCompleteButton: false,
        navigationIntegrateChildrenPages: false,
        detachParentIntegration: false,
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
  widgetItem: PagesWidgetItem,
} as WidgetControl<PagesProperties>;
