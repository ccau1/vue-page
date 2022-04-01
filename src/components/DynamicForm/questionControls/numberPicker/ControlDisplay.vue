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
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    data: Object,
    value: Object,
    onChange: Function,
  },
  computed: {
    step() {
      return this.$props.data.step || 1;
    },
    numValue() {
      if (this.$props.value?.num !== undefined) return this.$props.value.num;
      if (this.$props.data.default !== undefined)
        return this.$props.data.default;
      if (this.$props.data.min !== undefined) return this.$props.data.min;
      return 0;
    },
  },
  methods: {
    changeValue(newNum: number | string) {
      if (/^[^0-9]+$/.test(newNum.toString())) return;

      let _newNum = parseInt(newNum.toString(), 10);

      if (
        this.$props.data?.min !== undefined &&
        _newNum < this.$props.data?.min
      )
        _newNum = this.$props.data.min;
      if (
        this.$props.data?.max !== undefined &&
        _newNum > this.$props.data?.max
      )
        _newNum = this.$props.data.max;
      console.log("updating num", _newNum);

      this.$props.onChange?.({ num: _newNum });
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
