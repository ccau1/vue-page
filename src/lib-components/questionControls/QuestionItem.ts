import { QuestionWidgetItem } from '../widgetControls';

export default class QuestionItem {
  protected _widget: QuestionWidgetItem;

  get widget() {
    return this._widget;
  }

  constructor({ widget }: { widget: QuestionWidgetItem }) {
    this._widget = widget;
  }

  destroy() {}
}
