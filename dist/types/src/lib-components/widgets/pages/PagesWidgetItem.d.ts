import { PagesProperties } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";
export default class PagesWidgetItem extends WidgetItem<PagesProperties> {
    constructor(opts: {
        widget: Widget;
        getState: () => FormState;
        setState: (newState: FormState) => void;
        onUpdate: (newWidget: Widget<PagesProperties>) => void;
    });
    getSortedPages(): import(".").PagesPropertiesPage[];
    isWidgetIdInWidgetIds(widgetId: string, inWidgetIds: string[]): boolean;
    getChildIndexByWidgetId(widgetId: string): number;
    getChildrenIds(opts?: {
        deep?: boolean;
    }, meta?: {
        inPageIndices?: number[];
        currentPageIndexOnly?: boolean;
    }): string[];
    setChildErrors(childWidgetId: string, errors: any): void;
    addChild(childWidget: WidgetItem<any>, meta?: {
        pageIdx: number;
        childIdx: number;
    }): void;
    removeChild(childWidget: WidgetItem<any>): void;
    onChangePageIndex(toIndex: number): void;
    get currentPageIndex(): any;
    getParentPagesWidgets(opts?: {
        first?: boolean;
    }): PagesWidgetItem[] | PagesWidgetItem;
    getChildrenPagesWidgets(opts?: {
        first?: boolean;
        inPageIndices?: number[];
    }): PagesWidgetItem[] | PagesWidgetItem;
    toNextPage(): Promise<void>;
    toPreviousPage(): void;
    previousButtonType(): "previous" | "none";
    nextButtonType(): "next" | "complete" | "none";
    hasPreviousButton(): boolean;
    hasNextButton(): boolean;
}
