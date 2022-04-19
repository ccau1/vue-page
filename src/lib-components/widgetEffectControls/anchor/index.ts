import WidgetEffectControl from "../../models/WidgetEffectControl";
import display from "./Display.vue";

export interface AnchorEffectProperties {
  // id to navigate to
  id: string;
  // positioning anchor from top-left of widget wrapper
  top?: number;
}

export default new WidgetEffectControl<AnchorEffectProperties>({
  display,
});
