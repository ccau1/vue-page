<template>
  <div
    v-if="isOpen"
    class="alert"
    :style="alertStyles"
    :class="{ [widget.properties.type]: true }"
  >
    <h3>{{ t('__title', widget.id) }}</h3>
    <p>{{ t('__text', widget.id) }}</p>
    <a
      v-if="widget.properties.showCloseBtn"
      class="close-button"
      @click="onCloseAlert"
      >x</a
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
  props: WidgetControlProps,
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {
    alertStyles(): Partial<CSSStyleDeclaration> {
      if (
        this.widget?.properties.type !== 'custom' ||
        this.widget?.properties.customColor
      )
        return {};
      return {
        backgroundColor: this.widget?.properties.customBackgroundColor,
        borderColor: this.widget?.properties.customBorderColor || 'transparent',
        ...(this.widget?.properties.customTextColor
          ? { color: this.widget?.properties.customTextColor }
          : {}),
      };
    },
  },
  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
    },
  },
});
</script>

<style scoped>
.alert {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f4f6f8;
  border: 1px solid #e5e9ed;
  position: relative;
}
.alert.success {
  background-color: #ebf7ee;
  border-color: #e2f1e7;
}
.alert.info {
  background-color: #e6f0f8;
  border-color: #cad9e7;
}
.alert.danger {
  background-color: #fdede9;
  border-color: #f2e1dd;
}
.alert.warning {
  background-color: #fef8ea;
  border-color: #f4eada;
}

.alert > .close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 15px;
  cursor: pointer;
  transform: scaleX(1.2);
}
</style>
