<template>
  <div v-if="selectedWidgetItem">
    <select @change="onAddEffect">
      <option value="" disabled selected class="default">+</option>
      <option
        :value="panelSection.key"
        v-for="panelSection in panelSectionsAvailable"
        :key="panelSection.key"
      >
        {{ panelSection.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { WidgetEffectControl, WidgetItem } from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';
import { panelSections } from '../index';

export default defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
  inject: ['widgetEffectControls'],
  data() {
    return {
      panelSections,
    };
  },
  computed: {
    panelSectionsAvailable() {
      if (!this.$props.selectedWidgetItem) return [];
      return Object.keys((this as any).widgetEffectControls).reduce<
        WidgetEffectControl[]
      >((arr, effectKey) => {
        if (
          !(this.$props.selectedWidgetItem as WidgetItem)?.effects?.length ||
          (this.$props.selectedWidgetItem as WidgetItem)?.effects?.every(
            (effect) => effect.type !== effectKey
          )
        ) {
          // doesn't exists in widget item, can add to array
          arr.push((this as any).widgetEffectControls[effectKey]);
        }
        return arr;
      }, []);
    },
  },
  methods: {
    onAddEffect(ev: Event) {
      const selectedEffectKey = (ev.target as HTMLSelectElement).value;
      (ev.target as HTMLSelectElement).value = '';
      if (!(this as any).widgetEffectControls[selectedEffectKey]) {
        // effect key does not exist?? skip for now
        return;
      }
      (this.$props.selectedWidgetItem as WidgetItem).addEffect(
        (
          (this as any).widgetEffectControls[
            selectedEffectKey
          ] as WidgetEffectControl
        ).create()
      );
    },
  },
});
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 1px 6px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
select option.default {
  text-align: right;
}
</style>
