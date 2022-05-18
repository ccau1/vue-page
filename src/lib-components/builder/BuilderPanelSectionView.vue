<template>
  <div class="panel-section-wrapper" :class="{ isCollapsed }">
    <div class="panel-header">
      <div class="collapse-arrow" @click="onToggleCollapse">&#x203A;</div>
      <h5 class="panel-title" @click="onToggleCollapse">
        {{ panelSections[panelType].name }}
      </h5>
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
    isCollapsed: Boolean,
  },
  data() {
    return {
      panelSections,
    };
  },
  methods: {
    onToggleCollapse() {
      this.$emit("onToggleCollapse", !this.$props.isCollapsed);
    },
  },
});
</script>

<style scoped>
.panel-header {
  padding: 5px 5px;
  background-color: #cbf3f0;
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
  margin-left: 5px;
  flex: 1;
  cursor: pointer;
}
.panel-content {
}
.panel-section-wrapper:not(.isCollapsed) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.panel-section-wrapper.isCollapsed .panel-content {
  display: none;
}

.collapse-arrow {
  cursor: pointer;
}
.panel-section-wrapper:not(.isCollapsed) .collapse-arrow {
  transform: rotate(90deg);
}
.panel-section-wrapper:not(.isCollapsed) .panel-content {
  overflow: auto;
  flex: 1;
}
</style>
