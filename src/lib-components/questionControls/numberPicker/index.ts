import QuestionControl from "../QuestionControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

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
