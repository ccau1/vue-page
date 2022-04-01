import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";

export interface PagingData {}

export default {
  display: Display,
  form: Form,
} as WidgetControl<PagingData>;
