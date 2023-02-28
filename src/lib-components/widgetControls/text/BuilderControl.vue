<template>
  <div class="control-wrapper">
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h1' }"
      @click="(ev) => setTagType('h1')"
      >H1</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h2' }"
      @click="(ev) => setTagType('h2')"
      >H2</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h3' }"
      @click="(ev) => setTagType('h3')"
      >H3</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h4' }"
      @click="(ev) => setTagType('h4')"
      >H4</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h5' }"
      @click="(ev) => setTagType('h5')"
      >H5</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h6' }"
      @click="(ev) => setTagType('h6')"
      >H6</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'p' }"
      @click="(ev) => setTagType('p')"
      >Paragraph</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'small' }"
      @click="(ev) => setTagType('small')"
      >Small</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { WidgetItem } from '@/lib-components/models';
import {
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
} from '@/entry.esm';

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

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';

export default defineComponent({
  props: WidgetControlProps,
  inject: ['updateWidget'],
  methods: {
    setTagType(type: TagType) {
      (this.widget as WidgetItem).properties.tagType = type;
      (this as any).updateWidget(this.widget);
    },
  },
});
</script>

<style scoped>
.control-wrapper {
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  overflow: hidden;
}
.tag-selection {
  height: 30px;
  min-width: 40px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tag-selection:hover {
  background-color: #e8e8e8;
}
.tag-selection.selected {
  background-color: #03a9f4;
  color: #fff;
}
</style>
