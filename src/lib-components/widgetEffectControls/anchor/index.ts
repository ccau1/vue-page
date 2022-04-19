import WidgetEffectControl from "../../models/WidgetEffectControl";
import display from "./Display.vue";

export interface AnchorEffectProperties {
  id: string;
  top?: number;
}

export default new WidgetEffectControl<AnchorEffectProperties>({
  display,
});
