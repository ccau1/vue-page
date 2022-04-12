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
