<template>
  <div class="widget-wrapper" :widget-id="widget.id" :widget-code="widget.code">
    <component :is="'style'" scoped v-if="widget.style">
      {{ widget.style }}
    </component>
    <div class="widget-form-control" v-if="view === 'builder'">
      <component
        :is="getWidgetRender('builderControl', { nullable: true })"
        :widget="widget"
        :properties="widget.properties"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :pageState="pageState"
        :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        :getWidgetState="(key) => getWidgetState(key, widget)"
        :view="widgetView"
        @setWidgetState="(key, value) => setWidgetState(key, value, widget)"
        @getWidgetState="(key) => getWidgetState(key, widget)"
      />
    </div>
    <div
      :class="['widget-component-wrapper', `view-${widgetView}`]"
      ref="widgetComponentWrapper"
      :id="`widget-wrapper-${widget.id}`"
      :data-test="`widget-wrapper-${widget.code}`"
    >
      <template v-if="isMounted">
        <component
          v-for="widgetEffect in widget.effects"
          :key="widgetEffect.type"
          :is="getWidgetEffectRender(widgetEffect.type, 'display')"
          :properties="widgetEffect.properties"
          :wrapperRef="$refs.widgetComponentWrapper"
        />
        <component
          v-if="widget"
          :is="getWidgetRender(widgetView)"
          :id="`widget-${widget.id}`"
          :data-test="`widget-${widget.code}`"
          :widget="widget"
          :properties="widget.properties"
          :widgetControls="widgetControls"
          :widgetItems="widgetItems"
          :pageState="pageState"
          :setWidgetState="(key, value) => setWidgetState(key, value, widget)"
          :getWidgetState="(key) => getWidgetState(key, widget)"
          :view="widgetView"
          :wrapperRef="$refs.widgetComponentWrapper"
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
import { WidgetControl, WidgetControls, WidgetItems } from './interfaces';
import { PageState, WidgetEffectControl, WidgetItem } from './models';

export default defineComponent({
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
  inject: ['widgetEffectControls'],
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
    getWidgetEffectRender(effectType: string, view: string = 'display') {
      const widgetEffectType: WidgetEffectControl = (
        this.widgetEffectControls as { [key: string]: WidgetEffectControl }
      )[effectType];
      if (!widgetEffectType) {
        throw new Error(
          `widget effect type [${effectType}] from widget [${this.widget.id}] was not found. Maybe the widget effect control was not imported`
        );
      }

      const widgetRender = widgetEffectType[view] as VueConstructor<Vue>;
      if (!widgetRender) {
        throw new Error(
          `widget view [${view}] does not exist for widget effect type [${effectType}]`
        );
      }

      return widgetRender;
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
.widget-wrapper {
  padding: 0;
  scroll-margin: 100px;
}
</style>
