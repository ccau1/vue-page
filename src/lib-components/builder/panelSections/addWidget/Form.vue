<template>
  <div class="wrapper">
    <template v-for="(widgetControl, widgetControlKey) in widgetControls">
      <a
:key="widgetControlKey" class="widget-item"
>
        {{ widgetControlKey }}
      </a>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BuilderWidgetTree from '../../BuilderWidgetTree.vue';

export default defineComponent({
  components: { BuilderWidgetTree },
  inject: ['widgetControls'],
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
}
.widget-item {
  display: block;
  width: 33%;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
