import FormControl from "../FormControl";
import Form from "./Form.vue";
import Display from "./Display.vue";

interface CheckboxOptions {}

export default new FormControl<CheckboxOptions>({
  form: Form,
  display: Display,
});
