import FormControl from "../FormControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

interface CheckboxOptions {}

export default new FormControl<CheckboxOptions>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
