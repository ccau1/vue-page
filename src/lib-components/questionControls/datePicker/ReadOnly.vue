<template>
  <div>
    {{ value }}
  </div>
</template>

<script lang="ts">
import { WidgetItem, WidgetError } from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

const QuestionControlProps = {
  properties: {
    type: Object,
    required: true as const,
  },
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true as const,
  },
  t: {
    type: Function,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export default defineComponent({
  props: {
    ...QuestionControlProps,
  },
  computed: {
    label(): string {
      const selectedOption =
        this.widget?.properties.controlProperties.options.find(
          (f: { value: any; labelKey: string }) => f.value === this.value
        );
      return selectedOption?.labelKey
        ? (this as any).t(selectedOption.labelKey, this.widget?.id)
        : '';
    },
  },
});
</script>
