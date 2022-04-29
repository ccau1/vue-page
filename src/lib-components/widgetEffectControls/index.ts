import { WidgetEffectControl } from "../models/WidgetEffectControl";
import anchor from "./anchor";
import reveal from "./reveal";

export const widgetEffects = {
  anchor,
  reveal,
} as { [key: string]: WidgetEffectControl };
