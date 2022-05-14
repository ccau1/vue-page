<template>
  <pane :position="'right'" :isOpen="true">
    <template v-slot:pane-content>
      RIGHT: widget detail - layout, widget form, widget effects, styling,
      etc...
      <p v-if="!!selectedWidgetItem">type: {{ selectedWidgetItem.type }}</p>
      <component
        v-if="!!selectedWidgetItem && widgetControls[selectedWidgetItem.type]"
        :is="widgetControls[selectedWidgetItem.type].builderForm"
        :widget="selectedWidgetItem"
      />
      <builder-panel-section-view
        panelType="validations"
        :selectedWidgetItem="selectedWidgetItem"
        :widgetItems="widgetItems"
      />
      <builder-panel-section-view
        panelType="effects"
        :selectedWidgetItem="selectedWidgetItem"
        :widgetItems="widgetItems"
      />
    </template>
    <template>
      <slot />
    </template>
  </pane>
</template>

<script lang="ts">
import { PageState } from "../models/PageState";
import { defineComponent } from "@vue/composition-api";
import { WidgetItem } from "../models/WidgetItem";
import Pane from "./components/Pane.vue";
import { panelSections } from "./panelSections";
import BuilderPanelSectionView from "./BuilderPanelSectionView.vue";

export default defineComponent({
  components: { Pane, BuilderPanelSectionView },
  props: {
    widgetItems: Object,
  },
  inject: ["widgetControls", "widgetEffectControls", "getPageState"],
  data() {
    return {
      panelSections,
    };
  },
  computed: {
    selectedWidgetItem(): WidgetItem {
      const pageState: PageState = (this as any).getPageState();

      return pageState.interactiveState.selectedWidgetId
        ? this.$props.widgetItems?.[pageState.interactiveState.selectedWidgetId]
        : null;
    },
  },
});
</script>

<style scoped></style>
