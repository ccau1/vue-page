import { WidgetControl } from "../..";
export interface PagesPropertiesPage {
    labelKey: string;
    idx?: number;
    children: string[];
}
export interface PagesProperties {
    pages: PagesPropertiesPage[];
    navigationVisible?: boolean;
    navigationIntegrateParentPage?: boolean;
    tabsVisible?: boolean;
    hasCompleteButton?: boolean;
    navigationIntegrateChildrenPages?: boolean;
    detachParentIntegration?: boolean;
}
declare const _default: WidgetControl<PagesProperties>;
export default _default;
