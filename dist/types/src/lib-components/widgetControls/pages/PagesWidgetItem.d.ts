import { PageState } from "../../models/PageState";
import { PagesProperties } from ".";
import { Widget } from "../..";
import WidgetItem from "../../models/WidgetItem";
export default class PagesWidgetItem extends WidgetItem<PagesProperties> {
    constructor(opts: {
        widget: Widget;
        removeWidget: (widgetId: string) => void;
        emitEvent: (name: string, value?: any) => void;
        getState: () => PageState;
        setState: (newState: PageState) => void;
        onUpdate: (newWidget: Widget<PagesProperties>) => void;
    });
    getSortedPages(): {
        labelKey: string;
        idx?: number | undefined;
        children: string[];
    }[];
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
    pageIndexHasErrors(idx: number, opts?: {
        allChildPages?: boolean;
    }): boolean;
    currentPageIndexHasErrors(): boolean;
    toNextPage(): Promise<void>;
    toPreviousPage(): void;
    previousButtonType(): "previous" | "none";
    nextButtonType(): "next" | "complete" | "none";
    hasPreviousButton(): boolean;
    hasNextButton(): boolean;
}
