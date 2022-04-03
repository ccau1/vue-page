import { VueConstructor } from "vue";
import { ConditionProperties } from "json-rules-engine";
import WidgetItem from "./models/WidgetItem";

export { default as DynamicForm } from "./DynamicForm.vue";

export type FormStepperPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "center";

// export interface FormPageSetPage {
//   id: string;
//   label: string;
//   pageSet?: FormPageSet;
// }

// export interface FormPageSet {
//   stepperEnabled?: boolean;
//   stepperPosition?: [FormStepperPosition, FormStepperPosition];
//   counterEnabled?: boolean;
//   counterPosition?: [FormStepperPosition, FormStepperPosition];
//   pages: Array<FormPageSetPage>;
// }

export interface Widget<Data = any> {
  id: string;
  type: string;
  code?: string;
  parent?: string;
  reflexives?: ConditionProperties[];
  validations?: Array<{ conditions: ConditionProperties[]; error: string }>;
  order?: number;
  data: Data;
}

export interface WidgetControl<Data = any> {
  readOnly: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  form: VueConstructor<Vue>;
  formControl?: VueConstructor<Vue>;
  widgetItem?: typeof WidgetItem;

  // future, for DnD
  removeChild?: (options: {
    child: Widget;
    childId: string;
    widget: Widget<Data>;
  }) => WidgetItem<Data> | void;
  addChild?: (options: {
    child: WidgetItem;
    childId: string;
    widget: Widget<Data>;
    meta: {};
  }) => WidgetItem<Data> | void;
  getChildren?: (options: {
    widget: WidgetItem<Data>;
    widgetItems: WidgetItems;
    widgetControls: WidgetControls;
    deep?: boolean;
  }) => WidgetItem[];
}

export interface WidgetControls {
  [widgetType: string]: WidgetControl;
}

export interface WidgetItems {
  [widgetId: string]: WidgetItem;
}

export interface Form {
  // pageSet: FormPageSet;
  widgets: Widget[];
}
