<template>
  <div>
    <button @click="() => changeValue(numValue - step)">-</button>
    <input
      type="number"
      :value="numValue"
      :step="step"
      @keyup="(ev) => changeValue(ev.target.value)"
    />
    <button @click="() => changeValue(numValue + step)">+</button>
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
    value: Number,
  },
  created() {
    // if value has not been set and default is set, set value to default
    if (this.value === undefined && this.properties?.default !== undefined)
      (this as any).changeValue(this.properties.default, true);
  },
  computed: {
    step(): number {
      return this.properties?.step || 1;
    },
    numValue(): number {
      if (this.value !== undefined) return this.value;
      if (this.properties?.default !== undefined)
        return this.properties.default;
      if (this.properties?.min !== undefined) return this.properties.min;
      return 0;
    },
  },
  methods: {
    changeValue(newNum: number | string, ignoreChecks?: boolean) {
      if (/^[^0-9]+$/.test(newNum.toString())) return;

      let _newNum = parseInt(newNum.toString(), 10);

      if (this.properties?.min !== undefined && _newNum < this.properties?.min)
        _newNum = this.properties.min;
      if (this.properties?.max !== undefined && _newNum > this.properties?.max)
        _newNum = this.properties.max;

      this.onChange?.(_newNum, ignoreChecks);
    },
  },
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
</style>
