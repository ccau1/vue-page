<template>
  <section class="section-wrapper" :class="{ errors: hasChildErrors }">
    <label v-if="!!label">{{ label }}</label>
    <widgets-layout
      :widget-controls="widgetControls"
      :widget-items="widgetItems"
      :for-parent="widget.id"
    />
  </section>
</template>

<script lang="ts">
import {
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';
import { WidgetItem } from '../../models/WidgetItem';
import WidgetsLayout from '../../WidgetsLayout.vue';

const WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true as const,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true as const,
  },
  pageState: {
    type: Object as () => PageState,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true as const,
  },
  t: Function,
  properties: {
    type: Object,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export default defineComponent({
  components: { WidgetsLayout },
  props: WidgetControlProps,
  setup() {},
  computed: {
    label(): string {
      return this.t?.('__label', this.widget.id);
    },
    childErrors(): WidgetError[] | null {
      return this.widget.getState()?.childErrors;
    },
    hasChildErrors(): boolean {
      return this.widget.hasChildErrors();
    },
  },
  methods: {
    isShowLabel(pos: number) {
      return (
        this.widget.properties.hasLabel &&
        this.widget.properties.labelPosition === pos
      );
    },
  },
});
</script>

<style scoped>
.section-wrapper {
  position: relative;
  border: 1px solid #a9a9a9;
  min-height: 30px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}
.section-wrapper > label {
  position: absolute;
  top: 0px;
  left: 10px;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 10px;
}
.section-wrapper.errors {
  border-color: #f00;
}

@media only screen and (max-width: 600px) {
  .section-wrapper label {
    font-size: 10pt;
  }
}
</style>
