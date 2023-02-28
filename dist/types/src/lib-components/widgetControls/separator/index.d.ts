import { WidgetControl } from '../..';
export interface SeparatorProperties {
    dir: 'vertical' | 'horizontal';
    hasLabel?: boolean;
    labelPosition: 'start' | 'center' | 'end';
}
declare const _default: WidgetControl<SeparatorProperties>;
export default _default;
