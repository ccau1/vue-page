import {
  WidgetItem,
  WidgetItemConstructorOptions,
} from "../../models/WidgetItem";

import { SectionProperties } from ".";

export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
  constructor(opts: WidgetItemConstructorOptions) {
    super(opts);
  }

  getChildrenIds(): string[] {
    return this.properties.children;
  }

  addChild(childWidget: WidgetItem<any>, meta?: { idx: number }): void {
    super.addChild(childWidget, meta);
    this._widget.properties.children.splice(meta?.idx || 0, 0, childWidget.id);
  }

  removeChild(childWidget: WidgetItem<any>): void {
    super.removeChild(childWidget);
    const removeIdx = this._widget.properties.children.findIndex(
      (c) => c === childWidget.id
    );
    if (removeIdx > -1) this._widget.properties.children.splice(removeIdx, 1);
  }
}
