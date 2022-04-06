import { PagesProperties } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";

export default class PagingWidgetItem extends WidgetItem<PagesProperties> {
  constructor(opts: {
    widget: Widget;
    getState: () => FormState;
    setState: (newState: FormState) => void;
    onUpdate: (newWidget: Widget<PagesProperties>) => void;
  }) {
    super(opts);
  }

  getSortedPages() {
    // FIXME: should be sorted, but this creates loop in UI
    return this.properties.pages;
    // return this.properties.pages.sort((a, b) => (a.idx || 0) - (b.idx || 0));
  }

  isWidgetIdInWidgetIds(widgetId: string, inWidgetIds: string[]): boolean {
    return inWidgetIds.some((wId) => {
      return (
        wId === widgetId ||
        this.isWidgetIdInWidgetIds(
          widgetId,
          this._widgetItems[wId].getChildrenIds()
        )
      );
    });
  }

  getChildIndexByWidgetId(widgetId: string) {
    return this.getSortedPages().findIndex((page) => {
      return this.isWidgetIdInWidgetIds(widgetId, page.children);
    });
  }

  getChildrenIds(
    opts?: { deep?: boolean },
    meta?: { pageIdx: number }
  ): string[] {
    return this.properties.pages
      .filter((p) => meta?.pageIdx === undefined || p)
      .reduce<string[]>((arr, page) => {
        return [
          ...arr,
          ...page.children,
          ...(opts?.deep
            ? page.children.reduce<string[]>((childArr, childId) => {
                return [
                  ...childArr,
                  ...this._widgetItems[childId].getChildrenIds(opts),
                ];
              }, [])
            : []),
        ];
      }, []);
  }

  setChildErrors(childWidgetId: string, errors: any): void {
    // run original function to store the general state
    super.setChildErrors(childWidgetId, errors);

    // also store widget errors by children index

    // get current page index errors object from state
    const pageIndexErrors = this.getState("pageIdxErrors") || {};

    // find which index this childWidget belongs to
    const childIndex = this.getChildIndexByWidgetId(childWidgetId);

    if (childIndex === -1) {
      throw new Error("child widget not in paging");
    }
    if (!errors) {
      delete pageIndexErrors[childIndex]?.[childWidgetId];
      if (!Object.keys(pageIndexErrors[childIndex]).length)
        delete pageIndexErrors[childIndex];
    } else {
      if (!pageIndexErrors[childIndex]) {
        pageIndexErrors[childIndex] = {};
      }
      pageIndexErrors[childIndex][childWidgetId] = errors;
    }

    // save pageIdxErrors to state
    this.setState(
      "pageIdxErrors",
      Object.keys(pageIndexErrors).length ? pageIndexErrors : undefined
    );
  }

  addChild(
    childWidget: WidgetItem<any>,
    meta?: { pageIdx: number; childIdx: number }
  ): void {
    super.addChild(childWidget, meta);
    this._widget.properties.pages[meta?.pageIdx || 0].children.splice(
      meta?.childIdx || 0,
      0,
      childWidget.id
    );
  }

  removeChild(childWidget: WidgetItem<any>): void {
    super.removeChild(childWidget);
    this._widget.properties.pages.forEach((page) => {
      page.children = page.children.filter((c) => c !== childWidget.id);
    });
  }

  onChangePageIndex(toIndex: number) {
    const sortedPages = this.getSortedPages();
    if (toIndex < 0) return;
    if (toIndex > sortedPages.length - 1) return;
    this.setState("currentPageIndex", toIndex);
  }

  async toNextPage() {
    const children = this.getChildren({ deep: true });
    const currentPageIndex = this.getState("currentPageIndex") || 0;
    const hasErrors = (
      await Promise.all(
        children.map(async (child) => {
          return child.runValidations();
        })
      )
    ).some((err) => err);
    if (!hasErrors) {
      this.onChangePageIndex(currentPageIndex + 1);
    }
  }

  toPreviousPage() {
    const currentPageIndex = this.getState("currentPageIndex");
    this.onChangePageIndex(currentPageIndex - 1);
  }
}
