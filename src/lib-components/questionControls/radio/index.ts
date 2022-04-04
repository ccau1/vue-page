import FormControl from "../FormControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

interface RadioOptions {
  multiple?: boolean;
  values: Array<{ labelKey: string; value: string }>;
}

export default new FormControl<RadioOptions>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
