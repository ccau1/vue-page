<template>
  <pane :position="'right'" :isOpen="true">
    <template v-slot:pane-content>
      RIGHT: widget detail - layout, widget form, widget effects, styling,
      etc...
      <p v-if="!!selectedWidgetItem">type: {{ selectedWidgetItem.type }}</p>
      <component
        v-if="!!selectedWidgetItem && widgetControls[selectedWidgetItem.type]"
        :is="widgetControls[selectedWidgetItem.type].builderForm"
        :widget="selectedWidgetItem"
      />
      <div class="effects-wrapper" v-if="!!selectedWidgetItem">
        <div
          v-for="effect in selectedWidgetItem.effects"
          :key="effect.type"
        ></div>
      </div>
    </template>
    <template>
      <slot />
    </template>
  </pane>
</template>

<script lang="ts">
import { FormState } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";
import WidgetItem from "../models/WidgetItem";
import Pane from "./components/Pane.vue";

export default defineComponent({
  components: { Pane },
  props: {
    widgetItems: Object,
  },
  inject: ["widgetControls", "getFormState"],
  computed: {
    selectedWidgetItem(): WidgetItem {
      const formState: FormState = (this as any).getFormState();

      return formState.interactiveState.selectedWidgetId
        ? this.$props.widgetItems?.[formState.interactiveState.selectedWidgetId]
        : null;
    },
  },
});
</script>

<style scoped></style>
