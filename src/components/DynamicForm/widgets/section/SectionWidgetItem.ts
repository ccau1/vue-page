import { SectionData } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";

export default class SectionWidgetItem extends WidgetItem<SectionData> {
  constructor(opts: {
    widget: Widget;
    getState: () => FormState;
    setState: (newState: FormState) => void;
  }) {
    super(opts);
  }

  getChildrenIds(): string[] {
    return this.data.children;
  }
}
