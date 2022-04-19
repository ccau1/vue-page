import QuestionControl from "../QuestionControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface TextProperties {
  // whether text input will be multiline
  multiline?: boolean;
  // the max length the input allows
  maxLen?: number;
}

export default new QuestionControl<TextProperties>({
  display: Display,
  readOnly: ReadOnly,
});
