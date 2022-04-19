import { QuestionProperties } from ".";
import { Widget } from "../..";
import { FormState } from "../../models/FormState";
import WidgetItem from "../../models/WidgetItem";
export default class QuestionWidgetItem extends WidgetItem<QuestionProperties> {
    constructor(opts: {
        widget: Widget;
        getState: () => FormState;
        setState: (newState: FormState) => void;
        onUpdate: (newWidget: Widget<QuestionProperties>) => void;
    });
    runValidations(): Promise<string[] | null>;
}
