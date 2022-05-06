import { PageEventListener } from "@/lib-components/models/PageEventListener";
import { PageState } from "../../models/PageState";
import { SectionProperties } from ".";
import { Widget } from "../..";
import { WidgetItem } from "../../models/WidgetItem";

export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
  constructor(opts: {
    widget: Widget;
    removeWidget: (widgetId: string) => void;
    pageEventListener: PageEventListener;
    emitEvent: (name: string, value?: any) => Promise<void>;
    getState: () => PageState;
    setState: (newState: PageState) => void;
    onUpdate: (newWidget: Widget<SectionProperties>) => void;
  }) {
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
