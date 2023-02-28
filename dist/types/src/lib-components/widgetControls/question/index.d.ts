import { WidgetControl } from '../..';
export interface QuestionProperties<ControlProperties = {
    [key: string]: any;
}> {
    responseType: string;
    hideLabel?: boolean;
    control: string;
    controlProperties: ControlProperties;
}
export { default as QuestionWidgetItem } from './QuestionWidgetItem';
declare const _default: WidgetControl<QuestionProperties<{
    [key: string]: any;
}>>;
export default _default;
