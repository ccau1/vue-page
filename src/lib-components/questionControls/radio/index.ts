import FormControl from "../FormControl";
import Form from "./Form.vue";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface RadioProperties {
  multiple?: boolean;
  values: Array<{ labelKey: string; value: string }>;
}

export default new FormControl<RadioProperties>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
