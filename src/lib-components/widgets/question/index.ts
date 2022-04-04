import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import ReadOnly from "./WidgetReadOnly.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";

export interface QuestionData {
  responseType: string;
  control: string;
  controlData: { [key: string]: any };
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionData>;
