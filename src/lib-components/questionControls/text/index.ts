import Display from "./Display.vue";
import QuestionControl from "../QuestionControl";
import ReadOnly from "./ReadOnly.vue";

export interface TextQuestionProperties {
  // whether text input will be multiline
  multiline?: boolean;
  // the max length the input allows
  maxLen?: number;
}

export default new QuestionControl<TextQuestionProperties>({
  display: Display,
  readOnly: ReadOnly,
});
