import { v4 as uuidv4 } from 'uuid';
import { Widget, WidgetControl } from '../..';

import Builder from './Builder.vue';
import BuilderControl from './BuilderControl.vue';
import Display from './Display.vue';
import ReadOnly from './ReadOnly.vue';

export interface HeaderProperties {
  // the tag type to use
  tagType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default {
  create(props: Partial<HeaderProperties>): Widget<HeaderProperties> {
    return {
      id: uuidv4(),
      type: 'header',
      properties: {
        tagType: 'h1',
        ...props,
      },
    };
  },
  display: Display,
  builder: Builder,
  builderControl: BuilderControl,
  readOnly: ReadOnly,
} as WidgetControl<HeaderProperties>;
