import { ConditionProperties } from "json-rules-engine";
import Display from "./Display.vue";
import QuestionControl from "../QuestionControl";
import ReadOnly from "./ReadOnly.vue";

export interface DropdownPropertiesOption {
  labelKey: string;
  value: string;
  conditions?: ConditionProperties[];
}

export interface DropdownProperties {
  options: DropdownPropertiesOption[];
  multiple?: boolean;
}

export default new QuestionControl<DropdownProperties>({
  display: Display,
  readOnly: ReadOnly,
});
