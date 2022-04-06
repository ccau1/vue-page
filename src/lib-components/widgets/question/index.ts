import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";

export interface QuestionProperties {
  responseType: string;
  control: string;
  controlProperties: { [key: string]: any };
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionProperties>;
