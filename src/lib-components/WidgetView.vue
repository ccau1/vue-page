<template>
  <div class="widget-wrapper">
    <component :is="'style'" scoped v-if="widget.style">
      {{ widget.style }}
    </component>
    <div class="widget-form-control" v-if="view === 'form'">
      <component
        :is="widgetControls[widget.type].formControl"
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :formState="formState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
      />
    </div>
    <div>
      <component
        :is="widgetControls[widget.type][view || 'display']"
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
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

export default defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
  },
  setup() {},
});
</script>
