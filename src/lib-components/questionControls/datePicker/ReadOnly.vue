<template>
  <div>
    {{ value }}
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
  computed: {
    label() {
      const selectedOption =
        this.$props.widget.properties.controlProperties.options.find(
          (f: { value: any; labelKey: string }) => f.value === this.$props.value
        );
      return selectedOption?.labelKey
        ? (this as any).t(selectedOption.labelKey, this.$props.widget.id)
        : "";
    },
  },
});
</script>
