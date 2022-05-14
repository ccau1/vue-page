import { WidgetEffectControl } from "../../models/WidgetEffectControl";
import display from "./Display.vue";
import form from "./Form.vue";

export interface AnchorEffectProperties {
  // id to navigate to
  id: string;
  // positioning anchor from top-left of widget wrapper
  top?: number;
}

export default new WidgetEffectControl<AnchorEffectProperties>({
  key: "anchor",
  name: "Anchor",
  create(props: Partial<AnchorEffectProperties>) {
    return {
      type: this.key,
      properties: {
        id: "",
        top: 0,
        ...props,
      },
    };
  },
  display,
  form,
});
