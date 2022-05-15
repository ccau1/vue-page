<template>
  <div class="wrapper">
    <builder-panel-section-view
      v-for="sectionName in sections"
      :key="sectionName"
      :panelType="sectionName"
      :selectedWidgetItem="selectedWidgetItem"
      :widgetItems="widgetItems"
      :isCollapsed="collapsed[sectionName]"
      @onToggleCollapse="
        (newCollapsed) => onToggleCollapse(sectionName, newCollapsed)
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import BuilderPanelSectionView from "./BuilderPanelSectionView.vue";

export default defineComponent({
  components: { BuilderPanelSectionView },
  props: {
    sections: Array,
    selectedWidgetItem: Object,
    widgetItems: Object,
  },
  data() {
    return {
      collapsed: {},
    } as {
      collapsed: { [sectionName: string]: boolean };
    };
  },
  methods: {
    onToggleCollapse(sectionName: string, newIsCollapsed: boolean) {
      if (newIsCollapsed) {
        this.$data.collapsed[sectionName] = true;
      } else {
        delete this.$data.collapsed[sectionName];
      }
      this.$data.collapsed = { ...this.$data.collapsed };
    },
  },
});
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
