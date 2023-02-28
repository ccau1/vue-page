import { ConditionProperties } from 'json-rules-engine';
import QuestionControl from '../QuestionControl';
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
declare const _default: QuestionControl<DropdownProperties>;
export default _default;
