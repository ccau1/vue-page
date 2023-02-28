<template>
  <div v-if="!getWidgetState('reflexiveHide')">
    <div class="question-wrapper">
      <label v-if="!widget.properties.hideLabel">{{
        t('__label', widget.id)
      }}</label>
      <div>
        <component
          :is="questionControls[widget.properties.control].readOnly"
          :properties="widget.properties.controlProperties"
          :widget="widget"
          :on-change="onChange"
          :value="getWidgetState('response')"
          :set-widget-state="setWidgetState"
          :get-widget-state="getWidgetState"
          :view="view"
          :t="t"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  WidgetError,
  WidgetItem,
  WidgetItems,
  WidgetControls,
  PageState,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

let WidgetControlProps = {
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
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true,
  },
  t: Function,
  properties: {
    type: Object,
    required: true,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false,
  },
};

export default defineComponent({
  inject: [
    'questionControls',
    'widgetControls',
    'getPageState',
    'setPageState',
  ],
  props: WidgetControlProps,
  computed: {
    pageState(): PageState {
      return (this as any).getPageState();
    },
  },
  created() {},
  unmounted() {},
  methods: {
    onChange(response: any) {
      (this as any).setWidgetState('response', response);
    },
  },
});
</script>

<style scoped>
.question-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
}
.question-wrapper > label {
  flex: 1;
  max-width: 300px;
  border-right: 1px solid #393939;
  padding: 10px 0;
}
.question-wrapper > div {
  flex: 2;
  padding: 10px 20px;
}
</style>
