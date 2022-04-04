<template>
  <component class="header" :is="widget.data.tagType">{{
    t("__label", widget.id)
  }}</component>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
  },
  inject: ["t"],
});
</script>

<style scoped>
.header {
  padding: 0 10px;
}
</style>
