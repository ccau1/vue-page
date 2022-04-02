import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import { Engine, ConditionProperties } from "json-rules-engine";
import { handleReflexives } from "../../reflexiveUtils";

export interface PagingData {}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<PagingData>;
