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

  get currentPageIndex() {
    return this.getState("currentPageIndex") || 0;
  }

  getParentPagesWidgets(opts?: {
    first?: boolean;
  }): PagesWidgetItem[] | PagesWidgetItem {
    const parentPages = this.getParents().filter(
      (w) => w.type === "pages"
    ) as PagesWidgetItem[];
    return opts?.first ? parentPages[0] : parentPages;
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
      // update current pages or, if
      // navigationIntegrateParentPage is true,
      // update parent's instead

      // get next type first to determine which to update
      const nextType = this.nextButtonType();
      if (nextType === "complete") {
        // TODO: trigger complete button.
      } else if (nextType === "none") {
        // wasn't suppose to show, just skip it
        return;
      } else {
        // do a check to see if current is at its end
        const isCurrentPageAtEnd =
          this.currentPageIndex >= this._widget.properties.pages.length - 1;
        if (!isCurrentPageAtEnd) {
          // current pages still not at its end yet, update
          // current pages
          this.onChangePageIndex(currentPageIndex + 1);
        } else {
          // current pages at end, so update parent's
          const parentPagesWidget = this.getParentPagesWidgets({
            first: true,
          }) as PagesWidgetItem;
          parentPagesWidget.toNextPage();
        }
      }
    }
  }

  toPreviousPage() {
    this.onChangePageIndex(this.currentPageIndex - 1);
  }

  previousButtonType(): "previous" | "none" {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd = this.currentPageIndex <= 0;
    // check if there is any parents. Just get the immediate one
    const parentPages = this.getParentPagesWidgets({
      first: true,
    }) as PagesWidgetItem;
    // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state
    if (
      !this.properties.navigationIntegrateParentPage ||
      !parentPages ||
      !isCurrentPageAtEnd
    ) {
      if (isCurrentPageAtEnd) {
        return "none";
      }
      return "previous";
    }
    // return whether parent should be at its end
    return parentPages.previousButtonType();
  }

  nextButtonType(): "next" | "complete" | "none" {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd =
      this.currentPageIndex >= this._widget.properties.pages.length - 1;
    // check if there is any parents. Just get the immediate one
    const parentPages = this.properties.navigationIntegrateParentPage
      ? (this.getParentPagesWidgets({
          first: true,
        }) as PagesWidgetItem)
      : null;

    // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state
    if (
      !this.properties.navigationIntegrateParentPage ||
      !parentPages ||
      !isCurrentPageAtEnd
    ) {
      if (isCurrentPageAtEnd) {
        return this.properties.hasCompleteButton ? "complete" : "none";
      }
      return "next";
    }
    // return whether parent should be at its end
    return parentPages.nextButtonType();
  }

  hasPreviousButton(): boolean {
    return this.previousButtonType() !== "none";
  }

  hasNextButton(): boolean {
    return this.nextButtonType() !== "none";
  }
}
