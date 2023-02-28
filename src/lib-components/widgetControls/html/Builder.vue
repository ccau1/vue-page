<template>
  <div class="html-wrapper" v-html="t('__html', widget.id)" />
</template>

<script lang="ts">
import {
  WidgetError,
  WidgetItem,
  WidgetItems,
  WidgetControls,
  PageState,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

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
  props: WidgetControlProps,
});
</script>

<style scoped></style>
