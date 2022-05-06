<template>
  <div>
    {{ translatedLabel }}
  </div>
</template>

<script lang="ts">
import { WidgetItem } from "@/lib-components/models/WidgetItem";
import { defineComponent } from "@vue/composition-api";
import { DropdownProperties } from ".";

export default defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
  },
  inject: ["t"],
  data() {
    return { translatedLabel: "" };
  },
  methods: {
    getLabelByValue(value: string) {
      return (this as any).t(
        (this.$props.properties as DropdownProperties).options.find(
          (o) => o.value === value
        )?.labelKey || "",
        (this.$props.widget as WidgetItem).id
      );
    },
  },
  watch: {
    value: {
      handler(value) {
        this.$data.translatedLabel = this.getLabelByValue(value);
      },
      immediate: true,
    },
  },
});
</script>
