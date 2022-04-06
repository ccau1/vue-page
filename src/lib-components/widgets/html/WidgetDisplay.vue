<template>
  <div class="html-wrapper" v-html="t('__html', widget.id)" />
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
  },
  inject: ["t"],
});
</script>

<style scoped></style>
