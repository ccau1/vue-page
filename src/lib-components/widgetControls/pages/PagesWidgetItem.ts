import { PageEventListener } from "@/lib-components/models/PageEventListener";
import { PageState } from "../../models/PageState";
import { PagesProperties } from ".";
import { Widget } from "../..";
import { WidgetItem } from "../../models/WidgetItem";

export default class PagesWidgetItem extends WidgetItem<PagesProperties> {
  protected isSubmitting = false;

  constructor(opts: {
    widget: Widget;
    removeWidget: (widgetId: string) => void;
    pageEventListener: PageEventListener;
    emitEvent: (name: string, value: any, widget: Widget) => Promise<void>;
    getState: () => PageState;
    setState: (newState: PageState) => void;
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
    meta?: { inPageIndices?: number[]; currentPageIndexOnly?: boolean }
  ): string[] {
    return this.getSortedPages()
      .filter((p, pIndex) => {
        if (meta?.inPageIndices?.length) {
          return meta.inPageIndices.includes(pIndex);
        } else if (meta?.currentPageIndexOnly) {
          return pIndex === this.currentPageIndex;
        }
        return p;
      })
      .reduce<string[]>((arr, page) => {
        return [
          ...arr,
          ...page.children,
          ...(opts?.deep
            ? page.children.reduce<string[]>((childArr, childId) => {
                return [
                  ...childArr,
                  ...this._widgetItems[childId].getChildrenIds(opts, meta),
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
      if (!Object.keys(pageIndexErrors[childIndex] || {}).length)
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
    this._onUpdate(this);
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

  getChildrenPagesWidgets(opts?: {
    first?: boolean;
    inPageIndices?: number[];
  }): PagesWidgetItem[] | PagesWidgetItem {
    const childrenPages = this.getChildren(
      { deep: true },
      { inPageIndices: opts?.inPageIndices }
    ).filter((w) => w.type === "pages") as PagesWidgetItem[];
    return opts?.first ? childrenPages[0] : childrenPages;
  }

  pageIndexHasErrors(idx: number, opts?: { allChildPages?: boolean }): boolean {
    const pageIdxErrors = this.getState("pageIdxErrors") || {};
    // if no pageIdxErrors, just return false
    if (!Object.keys(pageIdxErrors).length) return false;
    // if current index doesn't have issues, that means
    // neither this page idx nor its children have any
    // errors, so just return false
    if (!Object.keys(pageIdxErrors[idx] || {}).length) return false;
    // if navigation integrate children pages, then check if
    // child pages has error in its CURRENT page idx
    const childPagesWidget = this.properties.navigationIntegrateChildrenPages
      ? (this.getChildrenPagesWidgets({
          first: true,
          inPageIndices: [this.currentPageIndex],
        }) as PagesWidgetItem)
      : null;
    if (
      childPagesWidget &&
      !childPagesWidget?.properties.detachParentIntegration &&
      childPagesWidget?.nextButtonType() !== "none"
    ) {
      return opts?.allChildPages
        ? childPagesWidget.hasChildErrors()
        : childPagesWidget.currentPageIndexHasErrors();
    }

    // since don't need to handle child pages widget and
    // current page idx has errors, return true
    return true;
  }

  currentPageIndexHasErrors(): boolean {
    return this.pageIndexHasErrors(this.currentPageIndex);
  }

  async toNextPage() {
    const children = this.getChildren(
      { deep: true },
      { currentPageIndexOnly: true }
    );
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
        const pageErrors = this.properties.pages.map((_, pageIdx) => {
          return this.pageIndexHasErrors(pageIdx, { allChildPages: true });
        });
        this.isSubmitting = true;
        await this.emitEvent("pages_complete", {
          pageErrors,
          hasErrors: pageErrors.some((hasError) => hasError),
          pageWidget: this,
        });
        this.isSubmitting = false;
      } else if (nextType === "none") {
        // wasn't suppose to show, just skip it
        return;
      } else {
        // current pages at end, so update parent's
        const childPagesWidget = this.properties
          .navigationIntegrateChildrenPages
          ? (this.getChildrenPagesWidgets({
              first: true,
              inPageIndices: [this.currentPageIndex],
            }) as PagesWidgetItem)
          : null;

        if (
          childPagesWidget &&
          !childPagesWidget?.properties.detachParentIntegration &&
          childPagesWidget?.nextButtonType() !== "none"
        ) {
          childPagesWidget.toNextPage();
        } else {
          this.onChangePageIndex(this.currentPageIndex + 1);
        }
      }
    }
  }

  toPreviousPage() {
    // get previous type first to determine which to update
    const previousType = this.previousButtonType();
    if (previousType === "none") {
      // wasn't suppose to be clicked, so just ignore
      return;
    }

    const childPagesWidget = this.properties.navigationIntegrateChildrenPages
      ? (this.getChildrenPagesWidgets({
          first: true,
          inPageIndices: [this.currentPageIndex],
        }) as PagesWidgetItem)
      : null;

    if (
      childPagesWidget &&
      !childPagesWidget?.properties.detachParentIntegration &&
      childPagesWidget?.previousButtonType() !== "none"
    ) {
      childPagesWidget.toPreviousPage();
    } else {
      this.onChangePageIndex(this.currentPageIndex - 1);
    }
  }

  previousButtonType(): "previous" | "none" {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd = this.currentPageIndex <= 0;
    // check if there is any parents. Just get the immediate one
    const childPages = this.getChildrenPagesWidgets({
      first: true,
    }) as PagesWidgetItem;
    // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state
    if (
      !this.properties.navigationIntegrateChildrenPages ||
      !childPages ||
      childPages.properties.detachParentIntegration ||
      !isCurrentPageAtEnd
    ) {
      if (isCurrentPageAtEnd) {
        return "none";
      }
      return "previous";
    }
    // return whether parent should be at its end
    return childPages.previousButtonType();
  }

  nextButtonType(): "next" | "complete" | "none" {
    // check whether this pages widget is at its end
    const isCurrentPageAtEnd =
      this.currentPageIndex >= this._widget.properties.pages.length - 1;
    // check if there is any parents. Just get the immediate one
    const childPages = this.properties.navigationIntegrateChildrenPages
      ? (this.getChildrenPagesWidgets({
          first: true,
        }) as PagesWidgetItem)
      : null;

    // if we don't need to integrate with parent pages or
    // current pages is not at its end yet, just return
    // based on current pages' state
    if (
      !this.properties.navigationIntegrateChildrenPages ||
      !childPages ||
      childPages.nextButtonType() === "none" ||
      childPages.properties.detachParentIntegration ||
      !isCurrentPageAtEnd
    ) {
      if (isCurrentPageAtEnd) {
        return this.properties.hasCompleteButton ? "complete" : "none";
      }
      return "next";
    }
    // return whether parent should be at its end
    return childPages.nextButtonType();
  }

  hasPreviousButton(): boolean {
    return (
      !!this.properties.navigationVisible &&
      this.previousButtonType() !== "none"
    );
  }

  hasNextButton(): boolean {
    return (
      !!this.properties.navigationVisible && this.nextButtonType() !== "none"
    );
  }
}
