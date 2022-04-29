import Display from "./Display.vue";
import QuestionControl from "../QuestionControl";
import ReadOnly from "./ReadOnly.vue";

export interface RadioProperties {
  // can select multiple
  multiple?: boolean;
  // an array of options with label + value
  options: Array<{ labelKey: string; value: string }>;
}

export default new QuestionControl<RadioProperties>({
  builder: Display,
  display: Display,
  readOnly: ReadOnly,
});
