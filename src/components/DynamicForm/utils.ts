import { FormWidgets, Widget, WidgetControls } from ".";
import { FormState } from "./models/FormState";

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

export const registerWidgetCode = ({
  formState,
  widget,
  setFormState,
}: {
  formState: FormState;
  widget: Widget;
  setFormState?: (newFormState: FormState) => void;
}) => {
  const _formState = new FormState(formState);
  if (!widget.code) return _formState;

  if (!_formState.widgetState.__questionsCodeWidgetIdMap)
    _formState.widgetState.__questionsCodeWidgetIdMap = {};

  _formState.widgetState.__questionsCodeWidgetIdMap[widget.code] = widget.id;

  setFormState?.(_formState);

  return _formState;
};

export const unregisterWidgetCode = ({
  formState,
  widgetCode,
}: {
  formState: FormState;
  widgetCode: string;
}) => {
  const _formState = new FormState(formState);
  delete _formState.widgetState.__questionsCodeWidgetIdMap[widgetCode];
  return _formState;
};
