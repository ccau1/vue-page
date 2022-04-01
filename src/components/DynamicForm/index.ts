import { VueConstructor } from "vue";
import { NestedCondition } from "json-rules-engine";
import { FormState } from "./models/FormState";

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

export interface Widget<Data = {}> {
  type: string;
  parent?: string;
  reflexives?: NestedCondition[];
  data: Data;
}

export interface WidgetControl<Data = {}> {
  readOnly: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  form: VueConstructor<Vue>;
  formControl: VueConstructor<Vue>;
  handleReflexives?: (options: {
    widget: Widget<Data>;
    widgetId: string;
    formWidgets: FormWidgets;
    formState: FormState;
    setFormState: (newFormState: FormState) => void;
  }) => boolean;
  removeChild?: (options: {
    child: Widget;
    childId: string;
    widget: Widget<Data>;
  }) => Widget<Data> | void;
  addChild?: (options: {
    child: Widget;
    childId: string;
    widget: Widget<Data>;
    meta: {};
  }) => Widget<Data> | void;
  getChildren?: (options: {
    widget: Widget<Data>;
    formWidgets: FormWidgets;
    widgetControls: WidgetControls;
    deep?: boolean;
  }) => Widget[];
}

export interface WidgetControls {
  [widgetType: string]: WidgetControl;
}

export interface FormWidgets {
  [widgetId: string]: Widget;
}

export interface Form {
  // pageSet: FormPageSet;
  widgets: FormWidgets;
}