import { WidgetControl } from "../..";
export interface SeparatorData {
    dir: "vertical" | "horizontal";
    hasLabel?: boolean;
    labelPosition: "start" | "center" | "end";
}
declare const _default: WidgetControl<SeparatorData>;
export default _default;
