<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="value"
        :name="widget.id"
        v-on:click="onToggle"
      />
      {{ t("__checkboxLabel") }}
    </label>
  </div>
</template>

<script lang="ts">
import { CheckboxProperties, QuestionControlProps } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent<
  QuestionControlProps<CheckboxProperties, Boolean>
>({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Boolean,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function,
  },
  methods: {
    onToggle(ev: Event) {
      this.$props.onChange?.((ev.target as HTMLInputElement).checked);
    },
  },
});
</script>
