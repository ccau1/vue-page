<template>
  <div class="widget-wrapper" @click.stop="onWidgetSelect">
    <component :is="'style'" scoped v-if="widget.style">
      {{ widget.style }}
    </component>
    <div
      class="widget-builder-control"
      :class="{
        hovered: formState.interactiveState.hoveredWidgetId === widget.id,
      }"
      v-if="view === 'builder' && widgetControls[widget.type].builderControl"
    >
      <component
        :is="widgetControls[widget.type].builderControl"
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :formState="formState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
      />
    </div>
    <div
      class="widget-component-wrapper"
      :class="{
        selected: formState.interactiveState.selectedWidgetId === widget.id,
        unselected:
          formState.interactiveState.selectedWidgetId &&
          formState.interactiveState.selectedWidgetId !== widget.id,
      }"
      ref="widgetComponentWrapper"
    >
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
        :formState="formState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="view"
        :wrapperRef="$refs.widgetComponentWrapper"
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
  inject: ["widgetEffectControls", "setFormState"],
  methods: {
    onWidgetSelect() {
      // if (
      //   this.$props.formState.interactiveState.selectedWidgetId ===
      //   this.$props.widget.id
      // ) {
      //   this.$props.formState.interactiveState.selectedWidgetId = "";
      // } else {
      this.$props.formState.interactiveState.selectedWidgetId =
        this.$props.widget.id;
      // }
      this.setFormState(this.$props.formState);
    },
  },
});
</script>

<style scoped>
.widget-component-wrapper {
  position: relative;
}
.widget-component-wrapper.selected {
  background-color: #fff;
  border: 1px solid #86d5fa;
  border-radius: 8px;
  padding: 0 10px;
  margin: -1px -11px -1px -11px;
}
.widget-component-wrapper.unselected {
  /* background-color: #fafafa; */
}
.widget-wrapper {
  padding: 0 10px;
}
.widget-builder-control {
  position: absolute;
  top: -10px;
  left: 10px;
  opacity: 0;
  transition: opacity 200ms;
  z-index: 10;
}
.widget-builder-control.hovered {
  opacity: 1;
}
</style>
