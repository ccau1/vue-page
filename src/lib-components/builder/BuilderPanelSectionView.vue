<template>
  <div class="panel-section-wrapper" v-if="!!selectedWidgetItem">
    <div class="panel-header">
      <h5 class="panel-title">{{ panelSections[panelType].name }}</h5>
      <component
        :is="panelSections[panelType].header"
        :widgetItems="widgetItems"
        :selectedWidgetItem="selectedWidgetItem"
      />
    </div>
    <div class="panel-content">
      <component
        :is="panelSections[panelType].form"
        :widgetItems="widgetItems"
        :selectedWidgetItem="selectedWidgetItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { panelSections } from "./panelSections";

export default defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
  data() {
    return {
      panelSections,
    };
  },
});
</script>

<style scoped>
.panel-header {
  padding: 5px 5px;
  background-color: #d3f1ff;
  color: #3a3a3a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px #a7a7a73b;
  z-index: 10;
  position: relative;
}
.panel-title {
  margin: 0;
}
.panel-content {
}
</style>
