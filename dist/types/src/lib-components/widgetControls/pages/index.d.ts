import { WidgetControl } from '../..';
export { default as PagesWidgetItem } from './PagesWidgetItem';
export interface PagesPropertiesPage {
    labelKey: string;
    idx?: number;
    children: string[];
}
export interface PagesProperties {
    pages: Array<{
        labelKey: string;
        idx?: number;
        children: string[];
    }>;
    navigationVisible?: boolean;
    tabsVisible?: boolean;
    hasCompleteButton?: boolean;
    navigationIntegrateChildrenPages?: boolean;
    detachParentIntegration?: boolean;
}
declare const _default: WidgetControl<PagesProperties>;
export default _default;
