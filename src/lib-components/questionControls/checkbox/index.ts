import QuestionControl from '../QuestionControl';
import Builder from './Builder.vue';
import Display from './Display.vue';
import ReadOnly from './ReadOnly.vue';

export interface CheckboxPropertiesOption {
  labelKey: string;
  value: string;
}

export interface CheckboxProperties {
  options: CheckboxPropertiesOption[];
  multiple?: boolean;
}

export default new QuestionControl<CheckboxProperties>({
  builder: Builder,
  display: Display,
  readOnly: ReadOnly,
});
