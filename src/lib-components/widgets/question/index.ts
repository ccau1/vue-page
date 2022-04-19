import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";

export interface QuestionProperties {
  responseType: string;
  hideLabel?: boolean;
  control: string;
  controlProperties: { [key: string]: any };
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionProperties>;
