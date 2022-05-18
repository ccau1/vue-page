<template>
  <builder-widget-tree
    :widgetItems="widgetItems"
    :selectedWidgetItem="selectedWidgetItem"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import BuilderWidgetTree from "../../BuilderWidgetTree.vue";

export default defineComponent({
  components: { BuilderWidgetTree },
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
});
</script>
