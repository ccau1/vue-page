import Display from './Display.vue';
import QuestionControl from '../QuestionControl';
import ReadOnly from './ReadOnly.vue';

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

export default new QuestionControl<DatePickerProperties>({
  display: Display,
  readOnly: ReadOnly,
});
