import QuestionControl from '../QuestionControl';
import Display from './Display.vue';
import ReadOnly from './ReadOnly.vue';

export interface NumberPickerProperties {
  // minimum amount the picker can go down to
  min?: number;
  // maximum amount the picker can go up to
  max?: number;
  // an incremental step for each up/down
  step?: number;
  // default number to start if no value given
  default?: number;
}

export default new QuestionControl<NumberPickerProperties>({
  builder: Display,
  display: Display,
  readOnly: ReadOnly,
});
