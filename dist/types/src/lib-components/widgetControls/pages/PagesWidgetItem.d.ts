import { WidgetItem, WidgetItemConstructorOptions } from "../../models/WidgetItem";
import { PagesProperties } from ".";
export default class PagesWidgetItem extends WidgetItem<PagesProperties> {
    protected isSubmitting: boolean;
    constructor(opts: WidgetItemConstructorOptions);
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
