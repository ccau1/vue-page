import QuestionControl from "../QuestionControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface DatePickerProperties {
  // string can be a date string or one of the following:
  // - Date.now()
  // - new Date()
  // - a dayjs chain function. Examples:
  //    - dayjs().add(7, 'day') --- (long way)
  //    - add(7, 'day')         --- (short way)
  defaultDate: string | Date;
  minDate: string | Date;
  maxDate: string | Date;
}

export * from "./utils";

export default new QuestionControl<DatePickerProperties>({
  display: Display,
  readOnly: ReadOnly,
});
