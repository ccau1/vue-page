<template>
  <div>
    <div
      v-for="widget in filteredWidgetItemsArr"
      :key="widget.id"
      class="widget-container"
    >
      <widget-view
        v-if="!widget.getState('reflexiveHide')"
        :widget="widget"
        :widget-controls="widgetControls"
        :widget-items="widgetItems"
        :page-state="pageState"
        :set-widget-state="setWidgetState"
        :get-widget-state="getWidgetState"
        :view="widgetView"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { arrayOf } from 'vue-types';
import WidgetView from './WidgetView.vue';

export default defineComponent({
  components: { WidgetView },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: arrayOf(String),
    onlyIncludeWidgetIds: arrayOf(String),
    widgetsOrder: arrayOf(String),
    forParent: String,
    view: String,
  },
  inject: ['widgetControls', 'getPageState', 'getView', 'setPageState'],
  computed: {
    widgetView() {
      return this.view || this.getView();
    },
    pageState() {
      return this.getPageState();
    },
    widgetItemsArr() {
      return Object.values(this.widgetItems);
    },
    filteredWidgetItemsArr() {
      return this.widgetItemsArr
        .filter((f) => {
          return (
            ((!this.forParent && !f.parentId) ||
              f.parentId === this.forParent) &&
            (!this.onlyIncludeWidgetIds ||
              this.onlyIncludeWidgetIds.includes(f.id)) &&
            (!(this.excludeWidgetIds || []).length ||
              !this.excludeWidgetIds.includes(f.id))
          );
        })
        .sort((a, b) => {
          const aOrder = (this.widgetsOrder || []).includes(a.id)
            ? this.widgetsOrder.indexOf(a.id)
            : a.order || 0;
          const bOrder = (this.widgetsOrder || []).includes(b.id)
            ? this.widgetsOrder.indexOf(b.id)
            : b.order || 0;
          return aOrder - bOrder;
        });
    },
  },
  methods: {
    setWidgetState(key, value, widget) {
      const pageState = this.pageState;
      if (value === undefined) {
        if (!pageState.widgetState[widget.id]) return;
        delete pageState.widgetState[widget.id][key];
      } else {
        if (!pageState.widgetState[widget.id])
          pageState.widgetState[widget.id] = {};
        pageState.widgetState[widget.id][key] = value;
      }
      this.setPageState(pageState);
    },
    getWidgetState(key, widget) {
      if (!key) {
        return this.pageState.widgetState[widget.id];
      }
      return this.pageState.widgetState[widget.id]?.[key];
    },
  },
});
</script>

<style scoped>
.widget-container {
  position: relative;
}
</style>
