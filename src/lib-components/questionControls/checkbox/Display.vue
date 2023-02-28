<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="value"
        :name="widget.id"
        v-on:click="onToggle"
      />
      {{ t('__checkboxLabel') }}
    </label>
  </div>
</template>

<script lang="ts">
import { CheckboxProperties, WidgetItem, WidgetError } from '@/entry.esm';
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
    properties: Object as () => CheckboxProperties,
  },
  methods: {
    onToggle(ev: Event) {
      this.$props.onChange?.((ev.target as HTMLInputElement).checked);
    },
  },
});
</script>
