<template>
  <pane :position="'right'" :isOpen="true">
    <template v-slot:pane-content>
      <builder-panel-section-list-view
        :sections="['widget', 'reflexives', 'validations', 'effects']"
        :widgetItems="widgetItems"
        :selectedWidgetItem="selectedWidgetItem"
      />
    </template>
    <template>
      <slot />
    </template>
  </pane>
</template>

<script lang="ts">
import { PageState } from '../models/PageState';
import { defineComponent } from '@vue/composition-api';
import { WidgetItem } from '../models/WidgetItem';
import Pane from './components/Pane.vue';
import { panelSections } from './panelSections';
import BuilderPanelSectionListView from './BuilderPanelSectionListView.vue';

export default defineComponent({
  components: { Pane, BuilderPanelSectionListView },
  props: {
    widgetItems: Object,
  },
  inject: ['widgetControls', 'widgetEffectControls', 'getPageState'],
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
