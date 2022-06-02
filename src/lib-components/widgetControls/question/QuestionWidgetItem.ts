import {
  WidgetItem,
  WidgetItemConstructorOptions,
} from "../../models/WidgetItem";

import { QuestionProperties } from ".";
import { WidgetError } from "@/entry.esm";

export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
  protected questionControlErrors: WidgetError[] = [];

  constructor(opts: WidgetItemConstructorOptions) {
    super(opts);
  }

  async setQuestionErrors(errors: WidgetError[]) {
    this.questionControlErrors = errors;
    await this.runValidations();
  }

  async runValidations(): Promise<WidgetError[] | null> {
    let errors: WidgetError[] | null = [
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
