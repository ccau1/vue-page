import { ValidationOptions, WidgetError } from '@/entry.esm';
import {
  WidgetItem,
  WidgetItemConstructorOptions,
} from '../../models/WidgetItem';

import QuestionItem from '@/lib-components/questionControls/QuestionItem';
import { QuestionProperties } from '.';

export default class QuestionWidgetItem<
  QI extends QuestionItem = QuestionItem
> extends WidgetItem<QuestionProperties> {
  protected questionControlErrors: WidgetError[] = [];
  protected _questionItem: QI | QuestionItem;

  get questionItem() {
    return this._questionItem;
  }

  constructor(opts: WidgetItemConstructorOptions) {
    super(opts);
    const QuestionItemClass =
      opts.getQuestionControls()[this._widget.properties.control]
        .questionItem || QuestionItem;
    this._questionItem = new QuestionItemClass({ widget: this });
  }

  async setQuestionErrors(errors: WidgetError[]) {
    this.questionControlErrors = errors;
    await this.runValidations();
  }

  async runValidations(
    opts?: ValidationOptions
  ): Promise<WidgetError[] | null> {
    let errors: WidgetError[] | null = [
      ...this.questionControlErrors,
      ...((await super.runValidations(opts)) || []),
    ];

    if (!errors?.length) errors = null;

    this.setState({
      errors: errors || [],
      valid: !errors,
      hasErrors: !!errors,
    });

    const parentIds = this.getParentIds();

    (parentIds || []).forEach((parentId) => {
      this._widgetItems[parentId].setChildErrors(this.id, errors);
    });

    return errors;
  }

  destroy() {
    super.destroy();
    this.questionItem.destroy();
  }
}
