import { PageState } from "../../models/PageState";
import { QuestionProperties } from ".";
import { Widget } from "../..";
import { WidgetItem } from "../../models/WidgetItem";
export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
    protected questionControlErrors: string[];
    constructor(opts: {
        widget: Widget;
        removeWidget: (widgetId: string) => void;
        emitEvent: (name: string, value?: any) => Promise<void>;
        getState: () => PageState;
        setState: (newState: PageState) => void;
        onUpdate: (newWidget: Widget<QuestionProperties>) => void;
    });
    setQuestionErrors(errors: string[]): void;
    runValidations(): Promise<string[] | null>;
}
