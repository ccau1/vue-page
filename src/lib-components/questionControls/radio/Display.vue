<template>
  <div>
    <label
      class="radio-item"
      v-for="option in properties.options"
      :key="option.value"
    >
      <input
        type="radio"
        v-on:change="onSelect"
        :checked="value === option.value"
        :value="option.value"
        :name="widget.id"
      />
      {{ t(option.labelKey, widget.id) }}
    </label>
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
    value: String,
  },
  methods: {
    onSelect(ev: Event) {
      this.onChange?.((ev.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
