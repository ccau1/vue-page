import { PageEventListener } from "@/lib-components/models/PageEventListener";
import { PageState } from "../../models/PageState";
import { QuestionProperties } from ".";
import { Widget } from "../..";
import { WidgetItem } from "../../models/WidgetItem";

export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
  protected questionControlErrors: string[] = [];

  constructor(opts: {
    widget: Widget;
    removeWidget: (widgetId: string) => void;
    pageEventListener: PageEventListener;
    emitEvent: (name: string, value?: any) => Promise<void>;
    getState: () => PageState;
    setState: (newState: PageState) => void;
    onUpdate: (newWidget: Widget<QuestionProperties>) => void;
  }) {
    super(opts);
  }

  setQuestionErrors(errors: string[]) {
    this.questionControlErrors = errors;
  }

  async runValidations(): Promise<string[] | null> {
    let errors: string[] | null = [
      ...((await super.runValidations()) || []),
      ...this.questionControlErrors,
    ];
    // FIXME: super.runValidations() also runs the following
    // two lines. Can reduce?
    this.setState("errors", errors);
    this._setPageState(this.pageState);

    if (!errors.length) errors = null;

    this.setState("valid", !errors);
    this.setState("hasErrors", !!errors);

    const parentIds = this.getParentIds();

    (parentIds || []).forEach((parentId) => {
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });

    return errors;
  }
}
