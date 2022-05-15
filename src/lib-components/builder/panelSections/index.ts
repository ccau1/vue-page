import PanelSection from "./PanelSection";
import effects from "./effects";
import reflexives from "./reflexives";
import validations from "./validations";

export const panelSections = {
  [effects.key]: effects,
  [validations.key]: validations,
  [reflexives.key]: reflexives,
} as { [key: string]: PanelSection };
