import { FormWidgets, Widget, WidgetControls } from ".";

export const getParents = ({
  widget,
  formWidgets,
  widgetControls,
}: {
  widget: Widget;
  formWidgets: FormWidgets;
  widgetControls: WidgetControls;
}): Widget[] => {
  // if no widget parent found, just return empty
  if (!widget.parent) return [];
  // get parent widget
  const parentWidget = formWidgets[widget.parent];
  // build array with parent widget and its ancestors
  const arr = [
    parentWidget,
    ...getParents({ widget: parentWidget, formWidgets, widgetControls }),
  ];
  // return array
  return arr;
};
