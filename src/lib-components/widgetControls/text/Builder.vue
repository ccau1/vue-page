<template>
  <component class="text" :is="widget.properties.tagType">
    <input
      type="text"
      :value="t('__label', widget.id)"
      @input="onTextChange"
      class="text-input"
    />
  </component>
</template>

<script lang="ts">
import { Widget } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    pageState: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    wrapperRef: HTMLDivElement,
    t: Function,
  },
  inject: ["getLocale", "setMessage"],
  methods: {
    onTextChange(val: Event) {
      (this as any).setMessage({
        id: (this.$props.widget as Widget).id,
        locale: (this as any).getLocale(),
        key: "__label",
        value: (val.target as HTMLInputElement).value,
      });
    },
  },
});
</script>

<style scoped>
.text {
}
.text-input {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
}
</style>
