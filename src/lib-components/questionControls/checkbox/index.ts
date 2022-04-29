import Builder from "./Builder.vue";
import Display from "./Display.vue";
import QuestionControl from "../QuestionControl";
import ReadOnly from "./ReadOnly.vue";

export interface CheckboxProperties {}

export default new QuestionControl<CheckboxProperties>({
  builder: Builder,
  display: Display,
  readOnly: ReadOnly,
});
