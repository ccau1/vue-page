import { FormState } from "../../models/FormState";
import { QuestionProperties } from ".";
import { Widget } from "../..";
import WidgetItem from "../../models/WidgetItem";

export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
  constructor(opts: {
    widget: Widget;
    emitEvent: (name: string, value?: any) => void;
    getState: () => FormState;
    setState: (newState: FormState) => void;
    onUpdate: (newWidget: Widget<QuestionProperties>) => void;
  }) {
    super(opts);
  }

  async runValidations(): Promise<string[] | null> {
    const errors = await super.runValidations();
    this.setState("valid", !errors);
    this.setState("hasErrors", !!errors);

    const parentIds = this.getParentIds();

    (parentIds || []).forEach((parentId) => {
      const parentState = this._widgetItems[parentId].getState();
      const childErrorsState = parentState?.childErrors || {};
      if (!errors && !childErrorsState[this.id]) return;
      if (!errors) {
        delete childErrorsState[this.id];
      } else {
        childErrorsState[this.id] = errors;
      }

      // FIXME: if this widget is reflexive, need
      // to handle parent's childErrors if not shown
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });

    return errors;
  }
}
