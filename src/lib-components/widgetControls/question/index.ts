import Builder from "./Builder.vue";
import Display from "./Display.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";
import ReadOnly from "./ReadOnly.vue";
import { WidgetControl } from "../..";

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
  builder: Builder,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionProperties>;
