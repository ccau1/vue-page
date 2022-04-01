import FormControl from "../FormControl";
import Form from "./ControlForm.vue";
import Display from "./ControlDisplay.vue";

interface NumberPickerData {
  min?: number;
  max?: number;
  step?: number;
}

export default new FormControl<NumberPickerData>({
  form: Form,
  display: Display,
});
