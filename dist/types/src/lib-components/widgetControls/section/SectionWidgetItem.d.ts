import { PageState } from "../../models/PageState";
import { SectionProperties } from ".";
import { Widget } from "../..";
import WidgetItem from "../../models/WidgetItem";
export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
    constructor(opts: {
        widget: Widget;
        removeWidget: (widgetId: string) => void;
        emitEvent: (name: string, value?: any) => void;
        getState: () => PageState;
        setState: (newState: PageState) => void;
        onUpdate: (newWidget: Widget<SectionProperties>) => void;
    });
    getChildrenIds(): string[];
    addChild(childWidget: WidgetItem<any>, meta?: {
        idx: number;
    }): void;
    removeChild(childWidget: WidgetItem<any>): void;
}
