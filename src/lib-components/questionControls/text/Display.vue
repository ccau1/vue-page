<template>
  <div>
    <input
      class="textInput"
      v-if="!properties.multiline"
      :value="value"
      type="text"
      @input="onTextChange"
    />
    <textarea
      class="textInput"
      v-if="properties.multiline"
      :value="value"
      @input="onTextChange"
    />
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
    onTextChange(ev: Event) {
      this.onChange?.((ev.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.textInput::-webkit-outer-spin-button,
.textInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
.textInput {
  min-height: 42px;
}
</style>
