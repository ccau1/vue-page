import WidgetEffectControl from "../../models/WidgetEffectControl";
import display from "./Display.vue";

export interface RevealEffectProperties {
  delay?: number;
  distance?: string;
  duration?: number;
  reset?: boolean;
  easing?: string;
  interval?: number;
  opacity?: number | null;
  origin?: "top" | "bottom" | "left" | "right";
  rotate?: { x: number; y: number; z: number };
  scale?: number;
  mobile?: boolean;
}

export default new WidgetEffectControl<RevealEffectProperties>({
  display,
});
