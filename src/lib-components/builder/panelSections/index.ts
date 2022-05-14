import PanelSection from "./PanelSection";
import effects from "./effects";
import validations from "./validations";

export const panelSections = {
  [effects.key]: effects,
  [validations.key]: validations,
} as { [key: string]: PanelSection };
