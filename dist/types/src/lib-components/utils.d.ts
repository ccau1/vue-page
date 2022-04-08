import { WidgetItems, WidgetControls } from ".";
import { FormState } from "./models/FormState";
import WidgetItem from "./models/WidgetItem";
export declare const getParents: ({ widget, widgetItems, widgetControls, }: {
    widget: WidgetItem;
    widgetItems: WidgetItems;
    widgetControls: WidgetControls;
}) => WidgetItem[];
export declare const registerWidgetCode: ({ formState, widget, setFormState, }: {
    formState: FormState;
    widget: WidgetItem;
    setFormState?: ((newFormState: FormState) => void) | undefined;
}) => FormState;
export declare const unregisterWidgetCode: ({ formState, widgetCode, }: {
    formState: FormState;
    widgetCode: string;
}) => FormState;
