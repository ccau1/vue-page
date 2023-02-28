import QuestionControl from '../QuestionControl';
export interface CheckboxPropertiesOption {
    labelKey: string;
    value: string;
}
export interface CheckboxProperties {
    options: CheckboxPropertiesOption[];
    multiple?: boolean;
}
declare const _default: QuestionControl<CheckboxProperties>;
export default _default;
