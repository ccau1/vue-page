<template>
  <div>
    <button @click="() => changeValue(-step)">-</button>
    <input
      type="number"
      :value="numValue"
      :step="step"
      @change="(ev) => changeValue(parseInt(ev.target.value, 10))"
    />
    <button @click="() => changeValue(step)">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { QuestionControlProps } from "../index";

export default defineComponent<QuestionControlProps>({
  props: {
    properties: Object,
    value: Number,
    onChange: Function,
  },
  computed: {
    step() {
      return this.$props.properties.step || 1;
    },
    numValue() {
      return (
        this.$props.value?.num ||
        this.$props.properties.default ||
        this.$props.properties.min ||
        0
      );
    },
  },
  methods: {
    changeValue(diff: number) {
      let newNum = (this as any).numValue + diff;
      if (
        this.$props.properties?.min !== undefined &&
        newNum < this.$props.properties?.min
      )
        newNum = this.$props.properties.min;
      if (
        this.$props.properties?.max !== undefined &&
        newNum > this.$props.properties?.max
      )
        newNum = this.$props.properties.max;

      this.$props.onChange?.({ num: newNum });
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
