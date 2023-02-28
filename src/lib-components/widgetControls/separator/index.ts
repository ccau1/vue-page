import { v4 as uuidv4 } from 'uuid';
import { Widget, WidgetControl } from '../..';

import Builder from './Builder.vue';
import BuilderForm from './BuilderForm.vue';
import Display from './Display.vue';
import ReadOnly from './ReadOnly.vue';

export interface SeparatorProperties {
  dir: 'vertical' | 'horizontal';
  hasLabel?: boolean;
  labelPosition: 'start' | 'center' | 'end';
}

export default {
  create(props: Partial<SeparatorProperties>): Widget<SeparatorProperties> {
    return {
      id: uuidv4(),
      type: 'separator',
      properties: {
        dir: 'horizontal',
        hasLabel: true,
        labelPosition: 'start',
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  builderForm: BuilderForm,
  readOnly: ReadOnly,
} as WidgetControl<SeparatorProperties>;
