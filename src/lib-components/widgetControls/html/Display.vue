<template>
  <div class="html-wrapper" v-html="t('__html')" />
</template>

<script>
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
});
</script>

<style scoped></style>
