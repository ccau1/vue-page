import { ConditionProperties } from "json-rules-engine";
import { VueConstructor } from "vue";
import { WidgetItem } from "./models/WidgetItem";

export type FormStepperPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "center";

export interface WidgetEffect {
  type: string;
  properties: { [key: string]: any };
}

export interface Widget<WidgetProperties = any> {
  id: string;
  type: string;
  code?: string;
  parent?: string;
  style?: string;
  effects?: WidgetEffect[];
  reflexiveRules?: ConditionProperties[];
  validationRules?: Array<{ conditions: ConditionProperties[]; error: string }>;
  order?: number;
  properties: WidgetProperties;
}

export interface WidgetControl<Data = any> {
  readOnly: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  builder: VueConstructor<Vue>;
  builderControl?: VueConstructor<Vue>;
  builderForm?: VueConstructor<Vue>;
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

export interface Page {
  widgets: Widget[];
}

export interface WidgetLanguage {
  id: string;
  refId: string;
  type: string;
  version: number;
  locale: string;
  message: { [key: string]: string };
}

export interface BuilderWidgetLanguages {
  [widgetId: string]: { [locale: string]: WidgetLanguage };
}
