import FormControl from "../FormControl";
export interface DatePickerProperties {
    defaultDate: string | Date;
    minDate: string | Date;
    maxDate: string | Date;
}
export * from "./utils";
declare const _default: FormControl<DatePickerProperties>;
export default _default;
