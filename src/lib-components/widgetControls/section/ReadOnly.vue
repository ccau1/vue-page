<template>
  <section class="section-wrapper">
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
  WidgetItem,
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';
import WidgetsLayout from '../../WidgetsLayout.vue';

let WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true,
  },
  pageState: {
    type: Object as () => PageState,
    required: true,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true,
  },
  t: Function,
  properties: {
    type: Object,
    required: true,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false,
  },
};

export default defineComponent({
  components: { WidgetsLayout },
  props: WidgetControlProps,
  setup() {},
  computed: {
    label(): string {
      return this.t?.('__label', this.widget?.id);
    },
  },
  methods: {
    isShowLabel(pos: number) {
      return (
        this.widget?.properties.hasLabel &&
        this.widget?.properties.labelPosition === pos
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
  margin: 10px;
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
</style>
