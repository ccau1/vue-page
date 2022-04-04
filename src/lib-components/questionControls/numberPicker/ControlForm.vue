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
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    data: Object,
    value: Number,
    onChange: Function,
  },
  computed: {
    step() {
      return this.$props.data.step || 1;
    },
    numValue() {
      return (
        this.$props.value?.num ||
        this.$props.data.default ||
        this.$props.data.min ||
        0
      );
    },
  },
  methods: {
    changeValue(diff: number) {
      let newNum = (this as any).numValue + diff;
      if (this.$props.data?.min !== undefined && newNum < this.$props.data?.min)
        newNum = this.$props.data.min;
      if (this.$props.data?.max !== undefined && newNum > this.$props.data?.max)
        newNum = this.$props.data.max;

      this.$props.onChange?.({ num: newNum });
    },
  },
})
export default class NumberPickerControl extends Vue {}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
</style>
