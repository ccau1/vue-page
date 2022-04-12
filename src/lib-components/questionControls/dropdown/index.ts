import QuestionControl from "../QuestionControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface DropdownPropertiesOption {
  labelKey: string;
  value: string;
}

export interface DropdownProperties {
  options: DropdownPropertiesOption[];
  multiple?: boolean;
}

export default new QuestionControl<DropdownProperties>({
  display: Display,
  readOnly: ReadOnly,
});
