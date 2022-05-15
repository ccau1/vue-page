<template>
  <div v-if="selectedWidgetItem">
    <button @click="addValidation" class="add-button">+</button>
  </div>
</template>

<script lang="ts">
import { WidgetEffectControl, WidgetItem } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";
import { panelSections } from "../index";

export default defineComponent({
  props: {
    panelType: String,
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
  inject: ["widgetEffectControls"],
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
    addValidation() {
      const validationsCount = (
        (this.$props.selectedWidgetItem as WidgetItem).validationRules || []
      )?.length;
      (this.$props.selectedWidgetItem as WidgetItem).addValidation({
        conditions: [],
        error: `err${validationsCount}`,
      });
    },
  },
});
</script>

<style scoped>
.add-button {
  background-color: transparent;
  border: none;
}
</style>
