import { ValidationOptions, WidgetError } from "../../../entry.esm";
import { WidgetItem, WidgetItemConstructorOptions } from '../../models/WidgetItem';
import QuestionItem from "../../questionControls/QuestionItem";
import { QuestionProperties } from '.';
export default class QuestionWidgetItem<QI extends QuestionItem = QuestionItem> extends WidgetItem<QuestionProperties> {
    protected questionControlErrors: WidgetError[];
    protected _questionItem: QI | QuestionItem;
    get questionItem(): QuestionItem | QI;
    constructor(opts: WidgetItemConstructorOptions);
    setQuestionErrors(errors: WidgetError[]): Promise<void>;
    runValidations(opts?: ValidationOptions): Promise<WidgetError[] | null>;
    destroy(): void;
}
