import FormControl from "../FormControl";
import Form from "./ControlForm.vue";
import Display from "./ControlDisplay.vue";
import ReadOnly from "./ControlReadOnly.vue";

interface NumberPickerData {
  min?: number;
  max?: number;
  step?: number;
  default?: number;
}

export default new FormControl<NumberPickerData>({
  form: Form,
  display: Display,
  readOnly: ReadOnly,
});
