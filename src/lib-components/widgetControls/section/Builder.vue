<template>
  <section class="section-wrapper" :class="{ errors: hasChildErrors }">
    <label>
      <input
        type="text"
        class="text-input"
        :value="label"
        @input="(ev) => updateText('label', ev.target.value)"
      />
    </label>
    <builder-widgets-layout
      :widget-controls="widgetControls"
      :widget-items="widgetItems"
      :for-parent="widget.id"
    />
  </section>
</template>

<script lang="ts">
import {
  WidgetError,
  WidgetControls,
  WidgetItem,
  WidgetItems,
  PageState,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';
import BuilderWidgetsLayout from '../../builder/BuilderWidgetsLayout.vue';
import WidgetsLayout from '../../WidgetsLayout.vue';

const WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true as const,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true as const,
  },
  pageState: {
    type: Object as () => PageState,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true as const,
  },
  t: Function,
  properties: {
    type: Object,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export default defineComponent({
  components: { BuilderWidgetsLayout, WidgetsLayout },
  inject: ['getLocale', 'setMessage'],
  props: WidgetControlProps,
  setup() {},
  computed: {
    label(): string {
      return this.t?.('__label', this.widget.id);
    },
    childErrors(): WidgetError[] {
      return this.widget.getState()?.childErrors;
    },
    hasChildErrors(): boolean {
      return this.widget.hasChildErrors();
    },
  },
  methods: {
    updateText(name: string, text: string): void {
      (this as any).setMessage({
        id: this.widget.id,
        locale: (this as any).getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, ''),
      });
    },
    isShowLabel(pos: number): boolean {
      return (
        this.widget.properties.hasLabel &&
        this.widget.properties.labelPosition === pos
      );
    },
  },
});
</script>

<style scoped>
.section-wrapper {
  position: relative;
  border: 1px solid #a9a9a9;
  min-height: 30px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}
.section-wrapper > label {
  position: absolute;
  top: 0px;
  left: 10px;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 1px 10px;
  z-index: 10;
}
.section-wrapper.errors {
  border-color: #f00;
}

.text-input {
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  resize: none;
  min-height: 10px;
  margin-bottom: -15px;
}
</style>
