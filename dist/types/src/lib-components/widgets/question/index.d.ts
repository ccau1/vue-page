import { WidgetControl } from "../..";
export interface QuestionProperties {
    responseType: string;
    hideLabel?: boolean;
    control: string;
    controlProperties: {
        [key: string]: any;
    };
}
declare const _default: WidgetControl<QuestionProperties>;
export default _default;
