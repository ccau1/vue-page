<template>
  <pane :position="'left'" :isOpen="true">
    <template v-slot:pane-content>
      <div class="button-group">
        <button
          v-for="section in sections"
          :key="section"
          :class="{ active: section === selectedSection }"
          @click="() => setSelectedSection(section)"
        >
          {{ panelSections[section].name }}
        </button>
      </div>
      <component
        :is="panelSections[selectedSection].form"
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
import { defineComponent } from '@vue/composition-api';
import Pane from './components/Pane.vue';
import BuilderWidgetTree from './BuilderWidgetTree.vue';
import { PageState, WidgetItem } from '@/entry.esm';
import { panelSections } from './panelSections';

export default defineComponent({
  components: { Pane, BuilderWidgetTree },
  props: {
    widgetItems: Object,
  },
  inject: ['getPageState'],
  data() {
    return {
      panelSections,
      sections: ['widgetTree', 'addWidget'],
      selectedSection: 'widgetTree',
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
  methods: {
    setSelectedSection(selectedSection: string) {
      this.$data.selectedSection = selectedSection;
    },
  },
});
</script>

<style scoped>
.button-group {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.button-group button {
  flex: 1;
  background-color: #fff;
  padding: 10px 5px;
  border-width: 0 0 4px 0;
  border-color: transparent;
  position: relative;
}
.button-group button.active::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #cbf3f0;
}
</style>
