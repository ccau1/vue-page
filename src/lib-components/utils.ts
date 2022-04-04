import { WidgetItems, WidgetControls } from ".";
import { FormState } from "./models/FormState";
import WidgetItem from "./models/WidgetItem";

export const getParents = ({
  widget,
  widgetItems,
  widgetControls,
}: {
  widget: WidgetItem;
  widgetItems: WidgetItems;
  widgetControls: WidgetControls;
}): WidgetItem[] => {
  // if no widget parent found, just return empty
  if (!widget.parentId) return [];
  // get parent widget
  const parentWidget = widgetItems[widget.parentId];
  // build array with parent widget and its ancestors
  const arr = [
    parentWidget,
    ...getParents({ widget: parentWidget, widgetItems, widgetControls }),
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
  widget: WidgetItem;
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
