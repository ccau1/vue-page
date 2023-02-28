import addWidget from './addWidget';
import effects from './effects';
import PanelSection from './PanelSection';
import reflexives from './reflexives';
import validations from './validations';
import widget from './widget';
import widgetTree from './widgetTree';

export const panelSections = {
  [addWidget.key]: addWidget,
  [effects.key]: effects,
  [reflexives.key]: reflexives,
  [validations.key]: validations,
  [widget.key]: widget,
  [widgetTree.key]: widgetTree,
} as { [key: string]: PanelSection };
