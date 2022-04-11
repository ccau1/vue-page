import FormControl from "../FormControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface TextProperties {
  multiline?: boolean;
  maxLen?: number;
}

export default new FormControl<TextProperties>({
  display: Display,
  readOnly: ReadOnly,
});
