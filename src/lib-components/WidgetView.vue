<template>
  <div class="widget-wrapper">
    <component :is="'style'" scoped v-if="widget.style">
      {{ widget.style }}
    </component>
    <div class="widget-form-control" v-if="view === 'builder'">
      <component
        :is="widgetControls[widget.type].builderControl"
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :pageState="pageState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
      />
    </div>
    <div class="widget-component-wrapper" ref="widgetComponentWrapper">
      <component
        v-for="widgetEffect in widget.effects"
        :key="widgetEffect.type"
        :is="widgetEffectControls[widgetEffect.type].display"
        :properties="widgetEffect.properties"
        :wrapperRef="$refs.widgetComponentWrapper"
      />
      <component
        :is="widgetControls[widget.type][view || 'display']"
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :pageState="pageState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
        :wrapperRef="$refs.widgetComponentWrapper"
        :t="widget.t"
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
    pageState: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
  },
  inject: ["widgetEffectControls"],
});
</script>

<style scoped>
.widget-component-wrapper {
  position: relative;
}
.widget-wrapper {
  padding: 0 10px;
}
</style>
