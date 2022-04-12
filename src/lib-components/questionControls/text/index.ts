import QuestionControl from "../QuestionControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface TextProperties {
  multiline?: boolean;
  maxLen?: number;
}

export default new QuestionControl<TextProperties>({
  display: Display,
  readOnly: ReadOnly,
});
