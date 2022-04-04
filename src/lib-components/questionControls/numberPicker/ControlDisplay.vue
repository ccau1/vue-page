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
    properties: Object,
    value: Number,
    onChange: Function,
  },
  created() {
    // if value has not been set and default is set, set value to default
    if (
      this.$props.value === undefined &&
      this.$props.properties.default !== undefined
    )
      (this as any).changeValue(this.$props.properties.default, true);
  },
  computed: {
    step() {
      return this.$props.properties.step || 1;
    },
    numValue() {
      if (this.$props.value !== undefined) return this.$props.value;
      if (this.$props.properties.default !== undefined)
        return this.$props.properties.default;
      if (this.$props.properties.min !== undefined)
        return this.$props.properties.min;
      return 0;
    },
  },
  methods: {
    changeValue(newNum: number | string, ignoreChecks?: boolean) {
      if (/^[^0-9]+$/.test(newNum.toString())) return;

      let _newNum = parseInt(newNum.toString(), 10);

      if (
        this.$props.properties?.min !== undefined &&
        _newNum < this.$props.properties?.min
      )
        _newNum = this.$props.properties.min;
      if (
        this.$props.properties?.max !== undefined &&
        _newNum > this.$props.properties?.max
      )
        _newNum = this.$props.properties.max;

      this.$props.onChange?.(_newNum, ignoreChecks);
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
