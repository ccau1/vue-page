<template>
  <div>
    <input
      v-if="!properties.multiline"
      :value="value"
      type="text"
      @input="onTextChange"
    />
    <textarea
      v-if="properties.multiline"
      :value="value"
      @input="onTextChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { QuestionControlProps } from "../index";

export default defineComponent<QuestionControlProps>({
  props: {
    properties: Object,
    value: String,
    onChange: Function,
  },
  created() {
    // if value has not been set and default is set, set value to default
    if (
      this.$props.value === undefined &&
      this.$props.properties?.default !== undefined
    )
      (this as any).changeValue(this.$props.properties.default, true);
  },
  computed: {
    step() {
      return this.$props.properties.step || 1;
    },
    numValue() {
      if (this.$props.value !== undefined) return this.$props.value;
      if (this.$props.properties?.default !== undefined)
        return this.$props.properties.default;
      if (this.$props.properties?.min !== undefined)
        return this.$props.properties.min;
      return 0;
    },
  },
  methods: {
    onTextChange(ev: Event) {
      this.$props.onChange((ev.target as HTMLInputElement).value);
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
