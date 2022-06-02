<template>
  <component class="text" :is="widget.properties.tagType">{{
    t("__label", widget.id)
  }}</component>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    t: Function,
  },
});
</script>

<style scoped>
.text {
}
</style>
