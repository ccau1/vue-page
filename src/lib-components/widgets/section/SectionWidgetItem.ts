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

  addChild(childWidget: WidgetItem<any>, meta?: { idx: number }): void {
    super.addChild(childWidget, meta);
    this._widget.data.children.splice(meta?.idx || 0, 0, childWidget.id);
  }

  removeChild(childWidget: WidgetItem<any>): void {
    super.removeChild(childWidget);
    const removeIdx = this._widget.data.children.findIndex(
      (c) => c === childWidget.id
    );
    if (removeIdx > -1) this._widget.data.children.splice(removeIdx, 1);
  }
}
