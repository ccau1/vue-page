<template>
  <component class="text" :is="widget.properties.tagType">{{
    t("__label", widget.id)
  }}</component>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({});
</script>

<style scoped>
.text {
  padding: 0 10px;
}
</style>
