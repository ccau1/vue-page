import FormControl from "../FormControl";
export interface RadioProperties {
    multiple?: boolean;
    values: Array<{
        labelKey: string;
        value: string;
    }>;
}
declare const _default: FormControl<RadioProperties>;
export default _default;
