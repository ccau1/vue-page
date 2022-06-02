import { WidgetItem, WidgetItemConstructorOptions } from "../../models/WidgetItem";
import { SectionProperties } from ".";
export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
    constructor(opts: WidgetItemConstructorOptions);
    getChildrenIds(): string[];
    addChild(childWidget: WidgetItem<any>, meta?: {
        idx: number;
    }): void;
    removeChild(childWidget: WidgetItem<any>): void;
}
