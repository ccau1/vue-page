import QuestionControl from '../QuestionControl';
export interface ButtonGroupPropertiesOption {
    labelKey: string;
    value: string;
}
export interface ButtonGroupProperties {
    options: ButtonGroupPropertiesOption[];
    multiple?: boolean;
}
declare const _default: QuestionControl<ButtonGroupProperties>;
export default _default;
