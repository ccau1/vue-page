<template>
  <a
    :id="$props.properties.id"
    class="anchor"
    :style="{ top: (properties.top || 0) + 'px' }"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    wrapperRef: HTMLDivElement,
    properties: Object,
  },
});
</script>

<style scoped>
a.anchor {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
