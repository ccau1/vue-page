import { SectionProperties } from '.';
import { WidgetItem, WidgetItemConstructorOptions } from '../../models/WidgetItem';
export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
    constructor(opts: WidgetItemConstructorOptions);
    getChildrenIds(): string[];
    addChild(childWidget: WidgetItem<any>, meta?: {
        idx: number;
    }): void;
    removeChild(childWidget: WidgetItem<any>): void;
}
