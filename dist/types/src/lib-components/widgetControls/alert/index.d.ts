import { WidgetControl } from '../..';
export interface AlertProperties {
    type: 'default' | 'info' | 'success' | 'danger' | 'warning' | 'custom';
    customColor?: string;
    showCloseBtn?: boolean;
}
declare const _default: WidgetControl<AlertProperties>;
export default _default;
