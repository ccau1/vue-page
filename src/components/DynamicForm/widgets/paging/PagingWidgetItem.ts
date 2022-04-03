import { PagingData } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";

export default class PagingWidgetItem extends WidgetItem<PagingData> {
  constructor(opts: {
    widget: Widget;
    getState: () => FormState;
    setState: (newState: FormState) => void;
  }) {
    super(opts);
  }

  getSortedPages() {
    // FIXME: should be sorted, but this creates loop in UI
    return this.data.pages;
    // return this.data.pages.sort((a, b) => (a.idx || 0) - (b.idx || 0));
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

  getChildrenIds(): string[] {
    return this.data.pages.reduce<string[]>((arr, page) => {
      return [...arr, ...page.children];
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
}
