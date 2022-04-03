import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";

export interface PagingData {}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
} as WidgetControl<PagingData>;
