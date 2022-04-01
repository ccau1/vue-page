<template>
  <div>
    <div
      class="widget-container"
      v-for="widget in filteredFormWidgetsArr"
      :key="widget.id"
    >
      <div class="widget-form-control" v-if="view === 'form'">
        <component
          :is="widgetControls[widget.type].formControl"
          :widget="widget"
          :widgetControls="widgetControls"
          :formWidgets="formWidgets"
          :formState="formState"
          :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
          :getWidgetState="(key) => getWidgetState(key, widget)"
          :view="view"
        />
      </div>
      <component
        :is="widgetControls[widget.type][view || 'display']"
        :widget="widget"
        :widgetControls="widgetControls"
        :formWidgets="formWidgets"
        :formState="formState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { arrayOf } from "vue-types";

export default defineComponent({
  props: {
    widgetControls: Object,
    formWidgets: Object,
    excludeWidgetIds: arrayOf(String),
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
    formWidgetsArr() {
      return Object.keys(this.$props.formWidgets).map((formId) => ({
        ...this.$props.formWidgets[formId],
        id: formId,
      }));
    },
    filteredFormWidgetsArr() {
      const filteredArr = this.formWidgetsArr
        .filter((f) => {
          return (
            f.parent === this.forParent &&
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
  setup() {},
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
