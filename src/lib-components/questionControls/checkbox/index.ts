import QuestionControl from "../QuestionControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface CheckboxProperties {}

export default new QuestionControl<CheckboxProperties>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
