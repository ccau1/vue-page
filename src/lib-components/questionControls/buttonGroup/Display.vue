<template>
  <div class="button-group-wrapper">
    <button
      :class="{
        isLast: index === options.length - 1,
        selected: value === option.value,
      }"
      v-for="(option, index) in options"
      :key="option.value"
      @click="() => onSelectChange(option.value)"
    >
      {{ option.label }}
    </button>
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
  },
  inject: ["t"],
  data() {
    return {
      options: [],
    };
  },
  watch: {
    ["properties.options"]: {
      handler() {
        // FIXME: need to handle on locale switch as well
        this.$data.options = this.$props.properties.options.map(
          (opt: { labelKey: string; value: string }) => ({
            value: opt.value,
            label: (this as any).t(opt.labelKey, this.$props.widget.id),
          })
        );
      },
      immediate: true,
    },
  },
  computed: {
    selectedValue() {
      return (
        this.$data.options as Array<{ label: string; value: string }>
      ).find((o) => o.value === this.$props.value);
    },
  },
  methods: {
    onSelectChange(value: string) {
      this.$props.onChange(value);
    },
  },
});
</script>

<style scoped>
.button-group-wrapper {
  display: inline-flex;
  flex-direction: row;
  border: 1px solid #000;
  border-radius: 8px;
  overflow: hidden;
}
button {
  border: 1px solid transparent;
  cursor: pointer;
  background-color: #fff;
}
button:not(.isLast) {
  border-right-color: #000;
}
button.selected {
  background-color: #03a9f4;
  color: #fff;
}
</style>
