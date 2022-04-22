<template>
  <component class="header" :is="widget.properties.tagType">
    <input type="text" :value="t('__label', widget.id)" class="header-input" />
  </component>
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
}
.header-input {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
}
</style>
