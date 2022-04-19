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
        :formState="formState"
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
    forParent: String,
  },
  inject: ["widgetControls", "getFormState", "getView", "setFormState"],
  computed: {
    view() {
      return this.getView();
    },
    formState() {
      return this.getFormState();
    },
    widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },
    filteredWidgetItemsArr() {
      const filteredArr = this.widgetItemsArr
        .filter((f) => {
          return (
            f.parentId === this.forParent &&
            (!this.$props.onlyIncludeWidgetIds ||
              this.$props.onlyIncludeWidgetIds.includes(f.id)) &&
            (!(this.excludeWidgetIds || []).length ||
              !this.excludeWidgetIds.includes(f.id))
          );
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return filteredArr;
    },
  },
  methods: {
    setWidgetState(key, value, widget) {
      const formState = this.formState;
      if (value === undefined) {
        if (!formState.widgetState[widget.id]) return;
        delete formState.widgetState[widget.id][key];
      } else {
        if (!formState.widgetState[widget.id])
          formState.widgetState[widget.id] = {};
        formState.widgetState[widget.id][key] = value;
      }
      this.setFormState(formState);
    },
    getWidgetState(key, widget) {
      return this.formState.widgetState[widget.id]?.[key];
    },
  },
});
</script>

<style scoped>
.widget-container {
  position: relative;
}
.widget-form-control {
  position: absolute;
  top: -40px;
  left: 0;
}
</style>
