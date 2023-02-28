<template>
  <div
    class="line-wrapper"
    :class="{ vertical: widget.properties.dir === 'vertical' }"
  >
    <label
      v-if="isShowLabel('start')"
      :class="{ [widget.properties.labelPosition || 'start']: true }"
      >{{ label }}</label
    >
    <div class="line" />
    <label
      v-if="isShowLabel('center')"
      :class="{ [widget.properties.labelPosition || 'start']: true }"
      >{{ label }}</label
    >
    <div class="line" />
    <label
      v-if="isShowLabel('end')"
      :class="{ [widget.properties.labelPosition || 'start']: true }"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import {
  WidgetItem,
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

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
  props: WidgetControlProps,
  setup() {},
  computed: {
    label(): string {
      return this.t?.('__label', this.widget.id);
    },
  },
  methods: {
    isShowLabel(pos: number) {
      return (
        this.widget.properties.hasLabel &&
        this.widget.properties.labelPosition === pos
      );
    },
  },
});
</script>

<style scoped>
.line-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}
.line-wrapper.vertical {
  flex-direction: column;
}

.line-wrapper .line {
  flex: 1;
  background-color: #a0a0a0;
  height: 1px;
}
.line-wrapper.vertical .line {
  width: 1px;
}
.line-wrapper label {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}
.line-wrapper label.start {
  padding-left: 0;
}
.line-wrapper label.end {
  padding-right: 0;
}

@media only screen and (max-width: 600px) {
  .line-wrapper label {
    font-size: 10pt;
  }
}
</style>
