import QuestionControl from "../QuestionControl";
import Form from "./ControlForm.vue";
import Display from "./ControlDisplay.vue";
import ReadOnly from "./ControlReadOnly.vue";

export interface NumberPickerProperties {
  min?: number;
  max?: number;
  step?: number;
  default?: number;
}

export default new QuestionControl<NumberPickerProperties>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
