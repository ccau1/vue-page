import { ConditionProperties } from 'json-rules-engine';
import QuestionControl from '../QuestionControl';
import Display from './Display.vue';
import ReadOnly from './ReadOnly.vue';

export interface DropdownPropertiesOption {
  labelKey: string;
  value: string | number;
  conditions?: ConditionProperties[];
}

export interface DropdownProperties {
  options: DropdownPropertiesOption[];
  defaultValue?: string | number;
  multiple?: boolean;
}

export default new QuestionControl<DropdownProperties>({
  display: Display,
  readOnly: ReadOnly,
});
