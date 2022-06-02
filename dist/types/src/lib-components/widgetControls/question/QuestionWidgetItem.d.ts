import { WidgetItem, WidgetItemConstructorOptions } from "../../models/WidgetItem";
import { QuestionProperties } from ".";
export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
    protected questionControlErrors: string[];
    constructor(opts: WidgetItemConstructorOptions);
    setQuestionErrors(errors: string[]): void;
    runValidations(): Promise<string[] | null>;
}
