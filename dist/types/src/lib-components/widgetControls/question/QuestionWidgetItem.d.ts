import { WidgetItem, WidgetItemConstructorOptions } from "../../models/WidgetItem";
import { QuestionProperties } from ".";
import { WidgetError } from "../../../entry.esm";
export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
    protected questionControlErrors: WidgetError[];
    constructor(opts: WidgetItemConstructorOptions);
    setQuestionErrors(errors: WidgetError[]): Promise<void>;
    runValidations(): Promise<WidgetError[] | null>;
}
