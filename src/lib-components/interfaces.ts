import {
  ConditionProperties,
  DynamicFactCallback,
  NestedCondition,
} from 'json-rules-engine';
import Vue, { VueConstructor } from 'vue';

import { PageState } from './models';
import { WidgetItem } from './models/WidgetItem';

export type FormValidationCondition =
  | ConditionProperties
  | FormValidationTopLevelCondition
  | string;
export type FormValidationAllConditions = {
  all: Array<string | FormValidationCondition>;
};
export type FormValidationAnyConditions = {
  any: Array<string | FormValidationCondition>;
};
export type FormValidationTopLevelCondition =
  | FormValidationAllConditions
  | FormValidationAnyConditions;

export let QuestionControlProps = {
  properties: {
    type: Object,
    required: true as const,
  },
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true as const,
  },
  t: {
    type: Function,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export let WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true as const,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true as const,
  },
  pageState: {
    type: Object as () => PageState,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true as const,
  },
  t: Function,
  properties: {
    type: Object,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export interface RuleEngineFactDefinitions {
  [name: string]: DynamicFactCallback;
}

export interface RuleEngineRuleDefinitions {
  [name: string]: NestedCondition | NestedCondition[] | Function;
}

export interface PageConfigValidations {
  deps?: string[];
  rules?: RuleEngineRuleDefinitions;
  facts?: RuleEngineFactDefinitions;
}

export interface PageConfig {
  widgetsToExclude?: string[];
  widgetControls?: {
    disableInternalControls: boolean;
    blacklist: string[];
    whitelist: string[];
    filters: { [key: string]: any };
  };
  questionControls?: {
    disableInternalControls: boolean;
    blacklist: string[];
    whitelist: string[];
    filters: { [key: string]: any };
  };
  widgetEffectControls?: {
    disableInternalControls: boolean;
    blacklist: string[];
    whitelist: string[];
    filters: { [key: string]: any };
  };
  meta?: { [key: string]: any };
  validations?: PageConfigValidations;
}

export interface WidgetError {
  err: string;
  data?: { [key: string]: any };
  isWarning?: boolean;
}

export type FormStepperPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center';

export type TranslateKey = string | TranslateKey[];

export type TranslateData = { [key: string]: any };

export interface WidgetEffect {
  type: string;
  properties: { [key: string]: any };
}

export interface ValidationRule {
  conditions: FormValidationCondition[];
  error: string;
}

export type ValidationRules = ValidationRule[];

export interface Widget<WidgetProperties = any> {
  id: string;
  type: string;
  code?: string;
  parent?: string;
  style?: string;
  effects?: WidgetEffect[];
  fetchPropertiesOnWidgetsChange?: string[];
  fetchPropertiesApi?: string;
  reflexiveRules?: Array<
    FormValidationCondition | FormValidationCondition[] | string
  >;
  validationRules?: Array<{
    conditions: Array<
      FormValidationCondition | FormValidationCondition[] | string
    >;
    isWarning?: boolean;
    error: string;
  }>;
  order?: number;
  properties: WidgetProperties;
}

export interface WidgetControl<Data = any> {
  [key: string]: VueConstructor<Vue> | undefined | typeof WidgetItem | Function;

  readOnly: VueConstructor<Vue>;
  display: VueConstructor<Vue>;
  builder: VueConstructor<Vue>;
  builderControl?: VueConstructor<Vue>;
  builderForm?: VueConstructor<Vue>;
  widgetTree?: VueConstructor<Vue>;
  widgetItem?: typeof WidgetItem;
  create?: (props: any) => Widget;

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

export interface ValidationOptions {
  setDirty?: boolean;
}
