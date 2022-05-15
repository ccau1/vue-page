import { Widget, WidgetControl } from "../..";

import Builder from "./Builder.vue";
import BuilderForm from "./BuilderForm.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";
import SectionWidgetItem from "./SectionWidgetItem";
import { v4 as uuidv4 } from "uuid";

export interface SectionProperties {
  // the children that this section holds
  children: string[];
}

export default {
  create(props: Partial<SectionProperties>): Widget<SectionProperties> {
    return {
      id: uuidv4(),
      type: "section",
      properties: {
        children: [],
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  builderForm: BuilderForm,
  readOnly: ReadOnly,
  widgetItem: SectionWidgetItem,
} as WidgetControl<SectionProperties>;
