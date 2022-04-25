<template>
  <component class="text" :is="widget.properties.tagType">{{
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
.text {
}
</style>
