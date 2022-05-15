import PanelSection from "./PanelSection";
import effects from "./effects";
import reflexives from "./reflexives";
import validations from "./validations";
import widget from "./widget";

export const panelSections = {
  [effects.key]: effects,
  [validations.key]: validations,
  [reflexives.key]: reflexives,
  [widget.key]: widget,
} as { [key: string]: PanelSection };
