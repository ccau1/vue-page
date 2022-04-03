import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import PagingWidgetItem from "./PagingWidgetItem";

export interface PagingDataPage {
  labelKey: string;
  idx?: number;
  children: string[];
}

export interface PagingData {
  pages: PagingDataPage[];
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: PagingWidgetItem,
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
} as WidgetControl<PagingData>;
