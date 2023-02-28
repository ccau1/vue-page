<template>
  <div class="widget-breadcrumb-wrapper" v-if="!!widget">
    <div
      class="widget-breadcrumb-item"
      v-for="parent in widget.getParents().reverse()"
      :key="parent.id"
      @click="() => setSelectWidget(parent)"
    >
      <p>{{ parent.type }}</p>
      <small v-if="parent.code">({{ parent.code }})</small>
    </div>

    <div class="widget-breadcrumb-item">
      <p>{{ widget.type }}</p>
      <small v-if="widget.code">({{ widget.code }})</small>
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetItem } from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    widget: Object,
    widgetItems: Object,
  },
  inject: ['getPageState', 'setPageState'],
  methods: {
    setSelectWidget(widget: WidgetItem) {
      const currentState = (this as any).getPageState();
      currentState.interactiveState.selectedWidgetId = widget.id;

      (this as any).setPageState(currentState);
    },
  },
});
</script>

<style scoped>
.widget-breadcrumb-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.widget-breadcrumb-item {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5px 10px 5px 20px;
  margin-top: 5px;
  align-items: center;
  cursor: pointer;
}
.widget-breadcrumb-item:not(:first-child)::before {
  content: '>';
  position: absolute;
  top: 6px;
  left: 0;
  font-size: 12pt;
}

.widget-breadcrumb-item p {
  margin: 0;
}
.widget-breadcrumb-item small {
  margin-left: 5px;
  color: #a1a1a1;
}
</style>
