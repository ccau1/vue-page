import FormControl from "../FormControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface CheckboxProperties {}

export default new FormControl<CheckboxProperties>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
