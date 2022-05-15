import { Widget, WidgetControl } from "../..";

import Builder from "./Builder.vue";
import Display from "./Display.vue";
import QuestionWidgetItem from "./QuestionWidgetItem";
import ReadOnly from "./ReadOnly.vue";
import { v4 as uuidv4 } from "uuid";

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
  create(props: Partial<QuestionProperties>): Widget<QuestionProperties> {
    return {
      id: uuidv4(),
      type: "question",
      properties: {
        responseType: "",
        hideLabel: false,
        control: "",
        controlProperties: {},
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
  widgetItem: QuestionWidgetItem,
} as WidgetControl<QuestionProperties>;
