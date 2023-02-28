import {
  WidgetItem,
  WidgetItemConstructorOptions,
} from '../../models/WidgetItem';

import { PagesProperties } from '.';

export default class PagesWidgetItem extends WidgetItem<PagesProperties> {
  protected isSubmitting = false;

  constructor(opts: WidgetItemConstructorOptions) {
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

  setChildLoading(childWidgetId: string, isLoading: boolean): void {
    // run original function to store the general state
    super.setChildLoading(childWidgetId, isLoading);

    // also store widget loading by children index

    // get current page index loading object from state
    const pageIndexLoadings = this.getState('pageIdxLoadings') || {};

    // find which index this childWidget belongs to
    const childIndex = this.getChildIndexByWidgetId(childWidgetId);

    if (childIndex === -1) {
      throw new Error(
        `child widget [${childWidgetId}] not in paging ${this.id}`
      );
    }
    if (!isLoading) {
      delete pageIndexLoadings[childIndex]?.[childWidgetId];
      if (!Object.keys(pageIndexLoadings[childIndex] || {}).length)
        delete pageIndexLoadings[childIndex];
    } else {
      if (!pageIndexLoadings[childIndex]) {
        pageIndexLoadings[childIndex] = {};
      }
      pageIndexLoadings[childIndex][childWidgetId] = isLoading;
    }

    // save pageIdxErrors to state
    this.setState(
      'pageIdxLoadings',
      Object.keys(pageIndexLoadings).length ? pageIndexLoadings : undefined
    );
  }

  pageIndexHasLoadings(
    idx: number,
    opts?: { allChildPages?: boolean }
  ): boolean {
    const pageIdxLoadings = this.getState('pageIdxLoadings') || {};
    // if no pageIdxLoadings, just return false
    if (!Object.keys(pageIdxLoadings || []).length) return false;
    // if current index doesn't have issues, that means
    // neither this page idx nor its children have any
    // loadings, so just return false
    if (!Object.keys(pageIdxLoadings[idx] || {}).length) return false;
    // if navigation integrate children pages, then check if
    // child pages has loadings in its CURRENT page idx
    const childPagesWidget = this.properties.navigationIntegrateChildrenPages
      ? (this.getChildrenPagesWidgets({
          first: true,
          inPageIndices: [this.currentPageIndex],
        }) as PagesWidgetItem)
      : null;
    if (
      childPagesWidget &&
      !childPagesWidget?.properties.detachParentIntegration &&
      childPagesWidget?.nextButtonType() !== 'none'
    ) {
      return opts?.allChildPages
        ? childPagesWidget.hasChildLoading()
        : childPagesWidget.currentPageIndexHasLoadings(opts);
    }

    // since don't need to handle child pages widget and
    // current page idx has errors, return true
    return true;
  }

  currentPageIndexHasLoadings(opts?: { allChildPages?: boolean }): boolean {
    return this.pageIndexHasLoadings(this.currentPageIndex, opts);
  }

  async setChildErrors(childWidgetId: string, errors: any): Promise<void> {
    // run original function to store the general state
    super.setChildErrors(childWidgetId, errors);

    const err = (await this._widgetItems[childWidgetId].isReflexive())
      ? errors
      : null;

    // also store widget errors by children index

    // get current page index errors object from state
    const originalPageIndexErrors = this.getState('pageIdxErrors') || {};
    const pageIndexErrors = { ...this.getState('pageIdxErrors') } || {};

    // find which index this childWidget belongs to
    const childIndex = this.getChildIndexByWidgetId(childWidgetId);

    if (childIndex === -1) {
      throw new Error(
        `child widget [${childWidgetId}] not in paging ${this.id}`
      );
    }
    if (!err) {
      delete pageIndexErrors[childIndex]?.[childWidgetId];
      if (!Object.keys(pageIndexErrors[childIndex] || {}).length)
        delete pageIndexErrors[childIndex];
    } else {
      if (!pageIndexErrors[childIndex]) {
        pageIndexErrors[childIndex] = {};
      }
      pageIndexErrors[childIndex][childWidgetId] = err;
    }

    // nothing to set, just return
    if (
      Object.keys(pageIndexErrors).length ===
        Object.keys(originalPageIndexErrors).length &&
      Object.keys(pageIndexErrors).every(
        (key) => originalPageIndexErrors[key] === pageIndexErrors[key]
      )
    ) {
      return;
    }

    // save pageIdxErrors to state
    this.setState(
      'pageIdxErrors',
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
    this._update(this);
  }

  onChangePageIndex(toIndex: number) {
    const sortedPages = this.getSortedPages();
    if (toIndex < 0) return;
    if (toIndex > sortedPages.length - 1) return;
    this.setState('currentPageIndex', toIndex);
  }

  get currentPageIndex() {
    return this.getState('currentPageIndex') || 0;
  }

  getParentPagesWidgets(opts?: {
    first?: boolean;
  }): PagesWidgetItem[] | PagesWidgetItem {
    const parentPages = this.getParents().filter(
      (w) => w.type === 'pages'
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
    ).filter((w) => w.type === 'pages') as PagesWidgetItem[];
    return opts?.first ? childrenPages[0] : childrenPages;
  }

  pageIndexHasErrors(
    idx: number,
    opts?: {
      allChildPages?: boolean;
      skipPristine?: boolean;
      includeWarnings?: boolean;
    }
  ): boolean {
    const pageIdxErrors = this.getState('pageIdxErrors') || {};

    // if no pageIdxErrors, just return false
    if (!Object.keys(pageIdxErrors || []).length) return false;
    // if current index doesn't have issues, that means
    // neither this page idx nor its children have any
    // errors, so just return false
    if (
      !Object.keys(pageIdxErrors[idx] || {}).filter(
        (widgetId) =>
          !opts?.skipPristine ||
          !this._widgetItems[widgetId].getState('pristine')
      ).length
    )
      return false;
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
      childPagesWidget?.nextButtonType() !== 'none'
    ) {
      return opts?.allChildPages
        ? childPagesWidget.hasChildErrors()
        : childPagesWidget.currentPageIndexHasErrors(opts);
    }

    // since don't need to handle child pages widget and
    // current page idx has errors, return true
    return true;
  }

  currentPageIndexHasErrors(opts?: { skipPristine?: boolean }): boolean {
    return this.pageIndexHasErrors(this.currentPageIndex, opts);
  }

  async toNextPage() {
    const children = this.getChildren(
      { deep: true },
      { currentPageIndexOnly: true }
    );
    const hasErrors = (
      await Promise.all(
        children.map(async (child) => {
          if (child.getState('pristine')) {
            child.setState({
              pristine: false,
              dirty: true,
            });
            child.update();
          }
          return (await child.isReflexive()) ? child.runValidations() : null;
        })
      )
    ).some((err) => (err || []).some((e) => !e.isWarning));

    if (!hasErrors) {
      // update current pages or, if
      // navigationIntegrateParentPage is true,
      // update parent's instead

      // get next type first to determine which to update
      const nextType = this.nextButtonType();
      if (nextType === 'complete') {
        const pageErrors = this.properties.pages.map((_, pageIdx) => {
          return this.pageIndexHasErrors(pageIdx, {
            allChildPages: true,
            includeWarnings: false,
          });
        });
        this.isSubmitting = true;
        await this.emitEvent('pages_complete', {
          pageErrors,
          hasErrors: pageErrors.some((hasError) => hasError),
          pageWidget: this,
        });
        this.isSubmitting = false;
      } else if (nextType === 'none') {
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
          childPagesWidget?.nextButtonType() !== 'none'
        ) {
          childPagesWidget.toNextPage();
        } else {
          this.onChangePageIndex(this.currentPageIndex + 1);
          this.emitEvent('pages_page_change', this.currentPageIndex);
        }
      }
    }
  }

  toPreviousPage() {
    // get previous type first to determine which to update
    const previousType = this.previousButtonType();
    if (previousType === 'none') {
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
      childPagesWidget?.previousButtonType() !== 'none'
    ) {
      childPagesWidget.toPreviousPage();
    } else {
      this.onChangePageIndex(this.currentPageIndex - 1);
      this.emitEvent('pages_page_change', this.currentPageIndex);
    }
  }

  previousButtonType(): 'previous' | 'none' {
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
        return 'none';
      }
      return 'previous';
    }
    // return whether parent should be at its end
    return childPages.previousButtonType();
  }

  nextButtonType(): 'next' | 'complete' | 'none' {
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
      childPages.nextButtonType() === 'none' ||
      childPages.properties.detachParentIntegration ||
      !isCurrentPageAtEnd
    ) {
      if (isCurrentPageAtEnd) {
        return this.properties.hasCompleteButton ? 'complete' : 'none';
      }
      return 'next';
    }
    // return whether parent should be at its end
    return childPages.nextButtonType();
  }

  hasPreviousButton(): boolean {
    return (
      !!this.properties.navigationVisible &&
      this.previousButtonType() !== 'none'
    );
  }

  hasNextButton(): boolean {
    return (
      !!this.properties.navigationVisible && this.nextButtonType() !== 'none'
    );
  }
}
