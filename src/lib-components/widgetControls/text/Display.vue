<template>
  <component
    :is="widget.properties.tagType"
    class="text"
    :maxlength="widget.properties.maxLength"
  >
    {{ t('__label', widget.id) }}
  </component>
</template>

<script lang="ts">
import { WidgetControls, WidgetItems, PageState } from '@/entry.esm';
import { WidgetItem } from '@/lib-components/models';
import { defineComponent } from '@vue/composition-api';

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
    t: Function,
    view: String,
  },
});
</script>

<style scoped>
.text {
}
</style>
