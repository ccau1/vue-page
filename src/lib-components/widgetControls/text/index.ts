import { v4 as uuidv4 } from 'uuid';
import { Widget, WidgetControl } from '../..';

import Builder from './Builder.vue';
import BuilderControl from './BuilderControl.vue';
import Display from './Display.vue';
import { TextProperties } from './interfaces';
import ReadOnly from './ReadOnly.vue';

export * from './interfaces';

export default {
  create(props: Partial<TextProperties>): Widget<TextProperties> {
    return {
      id: uuidv4(),
      type: 'text',
      properties: {
        tagType: 'p',
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  builderControl: BuilderControl,
  readOnly: ReadOnly,
} as WidgetControl<TextProperties>;
