<template>
  <div class="wrapper">
    <div class="left-pane"></div>
    <div class="center">
      <widget-breadcrumb
        :widget="selectedWidgetItem"
        :widgetItems="widgetItems"
      />
    </div>
    <div class="right-pane"></div>
  </div>
</template>

<script lang="ts">
import { PageState, WidgetItem, WidgetItems } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";
import WidgetBreadcrumb from "./components/WidgetBreadcrumb.vue";

export default defineComponent({
  components: { WidgetBreadcrumb },
  props: {
    widgetItems: Object,
  },
  inject: ["getPageState"],
  computed: {
    selectedWidgetItem(): WidgetItem | null {
      const pageState: PageState = (this as any).getPageState();

      return pageState.interactiveState.selectedWidgetId
        ? (this.widgetItems as WidgetItems)?.[
            pageState.interactiveState.selectedWidgetId
          ]
        : null;
    },
  },
});
</script>

<style scoped>
.wrapper {
  height: 40px;
  z-index: 1000;
  box-shadow: 0 0 4px -2px #000;
  display: flex;
  flex-direction: row;
}
.center {
  flex: 1;
}
.left-pane,
.right-pane {
  width: 300px;
}
</style>
