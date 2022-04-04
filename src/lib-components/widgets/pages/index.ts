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
  // removeChild: ({ child, childId, widget }) => {
  //   // remove child's id in pages
  //   widget.data.pages = widget.data.pages.map((page) => ({
  //     ...page,
  //     children: page.children.filter((c) => c !== childId),
  //   }));

  //   // return widget to signify require for update
  //   // in widgetItems object
  //   return widget;
  // },
  // addChild: ({ child, childId, widget }) => {},
} as WidgetControl<PagesData>;
