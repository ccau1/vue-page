import WidgetEffectControl from "../../models/WidgetEffectControl";
export interface RevealEffectProperties {
    delay?: number;
    distance?: string;
    duration?: number;
    reset?: boolean;
    easing?: string;
    interval?: number;
    opacity?: number | null;
    origin?: "top" | "bottom" | "left" | "right";
    rotate?: {
        x: number;
        y: number;
        z: number;
    };
    scale?: number;
    mobile?: boolean;
    desktop?: boolean;
}
declare const _default: WidgetEffectControl<RevealEffectProperties>;
export default _default;
