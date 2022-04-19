import { SectionProperties } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";
export default class SectionWidgetItem extends WidgetItem<SectionProperties> {
    constructor(opts: {
        widget: Widget;
        getState: () => FormState;
        setState: (newState: FormState) => void;
        onUpdate: (newWidget: Widget<SectionProperties>) => void;
    });
    getChildrenIds(): string[];
    addChild(childWidget: WidgetItem<any>, meta?: {
        idx: number;
    }): void;
    removeChild(childWidget: WidgetItem<any>): void;
}
