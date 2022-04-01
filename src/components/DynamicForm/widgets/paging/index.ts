import { Widget, WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface PagingDataPage {
  labelKey: string;
  idx: number;
  children: string[];
}

export interface PagingData {
  pages: PagingDataPage[];
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  getChildren: (opts) => {
    const { widget, formWidgets, widgetControls, deep } = opts;
    return widget.data.pages.reduce<Widget[]>((arr, page) => {
      arr = [
        ...arr,
        ...page.children.reduce<Widget[]>((childArr, child) => {
          const childWidget = formWidgets[child];
          childArr.push(childWidget);
          childArr = [
            ...childArr,
            childWidget,
            // if deep and child widget also has getChildren,
            // recursive downward
            ...(deep && widgetControls[childWidget.type].getChildren
              ? widgetControls[childWidget.type]?.getChildren?.(opts) || []
              : []),
          ];
          return childArr;
        }, []),
      ];
      return arr;
    }, []);
  },
  removeChild: ({ child, childId, widget }) => {
    // remove child's id in pages
    widget.data.pages = widget.data.pages.map((page) => ({
      ...page,
      children: page.children.filter((c) => c !== childId),
    }));

    // return widget to signify require for update
    // in formWidgets object
    return widget;
  },
  addChild: ({ child, childId, widget }) => {},
} as WidgetControl<PagingData>;
