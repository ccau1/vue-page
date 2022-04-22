<template>
  <div class="control-wrapper">
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h1' }"
      >H1</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h2' }"
      >H2</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h3' }"
      >H3</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h4' }"
      >H4</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h5' }"
      >H5</a
    >
    <a
      class="tag-selection"
      :class="{ selected: widget.properties.tagType === 'h6' }"
      >H6</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
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
  width: 40px;
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
