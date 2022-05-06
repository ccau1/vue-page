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
