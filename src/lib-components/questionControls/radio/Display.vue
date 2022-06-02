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
import { defineComponent } from "@vue/composition-api";
import { QuestionControlProps } from "../index";

export default defineComponent<QuestionControlProps>({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function,
  },
  methods: {
    onSelect(ev: Event) {
      this.$props.onChange((ev.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
