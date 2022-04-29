<template>
  <div>
    <div
      class="widget-container"
      v-for="widget in filteredWidgetItemsArr"
      :key="widget.id"
    >
      <widget-view
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :pageState="pageState"
        :setWidgetState="setWidgetState"
        :getWidgetState="getWidgetState"
        :view="view"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { arrayOf } from "vue-types";
import WidgetView from "./WidgetView.vue";

export default defineComponent({
  components: { WidgetView },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: arrayOf(String),
    onlyIncludeWidgetIds: arrayOf(String),
    widgetsOrder: arrayOf(String),
    forParent: String,
  },
  inject: ["widgetControls", "getPageState", "getView", "setPageState"],
  computed: {
    view() {
      return this.getView();
    },
    pageState() {
      return this.getPageState();
    },
    widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },
    filteredWidgetItemsArr() {
      const filteredArr = this.widgetItemsArr
        .filter((f) => {
          return (
            ((!this.forParent && !f.parentId) ||
              f.parentId === this.forParent) &&
            (!this.$props.onlyIncludeWidgetIds ||
              this.$props.onlyIncludeWidgetIds.includes(f.id)) &&
            (!(this.excludeWidgetIds || []).length ||
              !this.excludeWidgetIds.includes(f.id))
          );
        })
        .sort((a, b) => {
          const aOrder = (this.$props.widgetsOrder || []).includes(a.id)
            ? this.$props.widgetsOrder.indexOf(a.id)
            : a.order || 0;
          const bOrder = (this.$props.widgetsOrder || []).includes(b.id)
            ? this.$props.widgetsOrder.indexOf(b.id)
            : b.order || 0;
          return aOrder - bOrder;
        });
      return filteredArr;
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
