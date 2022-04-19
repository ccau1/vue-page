import { WidgetControl } from "../..";
import Display from "./Display.vue";
import Form from "./Form.vue";
import ReadOnly from "./ReadOnly.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";

export interface QuestionProperties {
  // the response data type (ie. BOOLEAN, TEXT)
  responseType: string;
  // whether to hide the label
  hideLabel?: boolean;
  // the control type
  control: string;
  // properties associated with the control type
  controlProperties: { [key: string]: any };
}

export default {
  display: Display,
  form: Form,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionProperties>;
