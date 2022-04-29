import { WidgetEffectControl } from "../../models/WidgetEffectControl";
import display from "./Display.vue";

export interface RevealEffectProperties {
  // time delay before running animation
  delay?: number;
  // travel distance from origin (ie. '50%', '50px')
  distance?: string;
  // time it takes to run the animation
  duration?: number;
  // enables/disables elements returning to their initialized position when they leave the viewport
  reset?: boolean;
  // controls how animations transition (ie. 'ease-in-out')
  easing?: string;
  // time between each reveal
  interval?: number;
  // specifies the opacity they have prior to being revealed (null = skip opacity)
  opacity?: number | null;
  // direction widget comes from when revealed
  origin?: "top" | "bottom" | "left" | "right";
  // rotation widget have prior to being revealed
  rotate?: { x: number; y: number; z: number };
  // scale widget have prior to being revealed
  scale?: number;
  // should run animation when mobile
  mobile?: boolean;
  // should run animation when desktop
  desktop?: boolean;
}

export default new WidgetEffectControl<RevealEffectProperties>({
  display,
});
