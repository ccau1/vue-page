<template>
  <component class="text" :is="widget.properties.tagType">
    <input
      type="text"
      :value="t('__label', widget.id)"
      @input="onTextChange"
      class="text-input"
    />
  </component>
</template>

<script lang="ts">
import {
  Widget,
  WidgetItem,
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
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
  inject: ['getLocale', 'setMessage'],
  methods: {
    onTextChange(val: Event) {
      (this as any).setMessage({
        id: (this.$props.widget as Widget).id,
        locale: (this as any).getLocale(),
        key: '__label',
        value: (val.target as HTMLInputElement).value,
      });
    },
  },
});
</script>

<style scoped>
.text {
}
.text-input {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
}
</style>
