import QuestionControl from "../QuestionControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface RadioProperties {
  multiple?: boolean;
  values: Array<{ labelKey: string; value: string }>;
}

export default new QuestionControl<RadioProperties>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
