<template>
  <div class="widget-wrapper" @click.stop="onWidgetSelect">
    <component :is="'style'" scoped v-if="widget.style">
      {{ widget.style }}
    </component>
    <div
      v-if="view === 'builder' && widgetControls[widget.type].builderControl"
      class="widget-builder-control"
      :class="{
        hovered: pageState.interactiveState.hoveredWidgetId === widget.id,
      }"
    >
      <component
        :is="widgetControls[widget.type].builderControl"
        :widget="widget"
        :properties="widget.properties"
        :widget-controls="widgetControls"
        :widget-items="widgetItems"
        :page-state="pageState"
        :set-widget-state="(key, value) => setWidgetState(key, value, widget)"
        :get-widget-state="(key) => getWidgetState(key, widget)"
        :view="view"
      />
    </div>
    <div
      ref="widgetComponentWrapper"
      class="widget-component-wrapper"
      :class="{
        selected: pageState.interactiveState.selectedWidgetId === widget.id,
        unselected:
          pageState.interactiveState.selectedWidgetId &&
          pageState.interactiveState.selectedWidgetId !== widget.id,
      }"
    >
      <template v-if="isMounted">
        <component
          :is="widgetEffectControls[widgetEffect.type].display"
          v-for="widgetEffect in widget.effects"
          :key="widgetEffect.type"
          :properties="widgetEffect.properties"
          :wrapper-ref="$refs.widgetComponentWrapper"
        />
        <component
          :is="getWidgetRender(widgetView)"
          :id="`widget-${widget.id}`"
          :data-test="`widget-${widget.code}`"
          :widget="widget"
          :properties="widget.properties"
          :widget-controls="widgetControls"
          :widget-items="widgetItems"
          :page-state="pageState"
          :set-widget-state="(key, value) => setWidgetState(key, value, widget)"
          :get-widget-state="(key) => getWidgetState(key, widget)"
          :view="view"
          :wrapper-ref="$refs.widgetComponentWrapper"
          :t="widget.t"
          @setWidgetState="(key, value) => setWidgetState(key, value, widget)"
          @getWidgetState="(key) => getWidgetState(key, widget)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { VueConstructor } from 'vue';
import { WidgetControl, WidgetControls, WidgetItems } from '../interfaces';
import { PageState, WidgetItem } from '../models';

export default defineComponent({
  inject: ['widgetEffectControls', 'setPageState'],
  props: {
    widget: {
      type: Object as () => WidgetItem,
      required: true,
    },
    widgetControls: {
      type: Object as () => WidgetControls,
      required: true,
    },
    widgetItems: {
      type: Object as () => WidgetItems,
      required: true,
    },
    pageState: {
      type: Object as () => PageState,
      required: true,
    },
    setWidgetState: {
      type: Function,
      required: true,
    },
    getWidgetState: {
      type: Function,
      required: true,
    },
    view: String,
  },
  data() {
    return {
      isMounted: false,
    } as {
      isMounted: boolean;
    };
  },
  computed: {
    widgetView(): string {
      return this.view || 'display';
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    onWidgetSelect() {
      // if (
      //   this.pageState.interactiveState.selectedWidgetId ===
      //   this.widget.id
      // ) {
      //   this.pageState.interactiveState.selectedWidgetId = "";
      // } else {
      this.pageState.interactiveState.selectedWidgetId = this.widget.id;
      // }
      (this as any).setPageState(this.pageState);
    },
    getWidgetRender(
      view: string = 'display',
      opts?: { nullable?: boolean }
    ): VueConstructor<Vue> | null {
      const widgetType: WidgetControl =
        this.widgetControls[this.widget?.type || ''];
      if (!widgetType) {
        if (opts?.nullable) {
          return null;
        }
        throw new Error(
          `widget type [${this.widget?.type}] from widget [${this.widget.id}] was not found. Maybe the widget control was not imported`
        );
      }

      const widgetRender = widgetType[view] as VueConstructor<Vue>;
      if (!widgetRender) {
        if (opts?.nullable) {
          return null;
        }
        throw new Error(
          `widget view [${view}] does not exist for widget type [${this.widget.type}]`
        );
      }

      return widgetRender;
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
  padding: 0;
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
