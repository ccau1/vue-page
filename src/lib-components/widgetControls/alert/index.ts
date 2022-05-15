import { Widget, WidgetControl } from "../..";

import Builder from "./Builder.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import { v4 as uuidv4 } from "uuid";

export interface AlertProperties {
  // what type of alert is this (effects colors)
  type: "default" | "info" | "success" | "danger" | "warning" | "custom";
  // if type is 'custom', what color to show
  customColor?: string;
  // whether close button is shown
  showCloseBtn?: boolean;
}

export default {
  create(props: Partial<AlertProperties>): Widget<AlertProperties> {
    return {
      id: uuidv4(),
      type: "alert",
      properties: {
        type: "default",
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  readOnly: ReadOnly,
} as WidgetControl<AlertProperties>;
