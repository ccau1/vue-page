import QuestionControl from "../QuestionControl";
export interface RadioProperties {
    multiple?: boolean;
    values: Array<{
        labelKey: string;
        value: string;
    }>;
}
declare const _default: QuestionControl<RadioProperties>;
export default _default;
