import QuestionControl from "../QuestionControl";
import Display from "./Display.vue";
import ReadOnly from "./ReadOnly.vue";

export interface ButtonGroupPropertiesOption {
  labelKey: string;
  value: string;
}

export interface ButtonGroupProperties {
  options: ButtonGroupPropertiesOption[];
  multiple?: boolean;
}

export default new QuestionControl<ButtonGroupProperties>({
  display: Display,
  readOnly: ReadOnly,
});
