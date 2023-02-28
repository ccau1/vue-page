<template>
  <div>
    <div class="existing-effects-wrapper" v-if="selectedWidgetItem">
      <div
        class="effect-wrapper"
        v-for="effect in selectedWidgetItem.effects"
        :key="effect.type"
      >
        <a class="remove-effect-button" @click="() => removeEffect(effect)"
          >&#x1f5d1;</a
        >
        <h6 class="effect-header">
          {{ widgetEffectControls[effect.type].name }}
        </h6>
        <component
          :is="widgetEffectControls[effect.type].form"
          :effect="effect"
          :properties="effect.properties"
          :widgetItem="selectedWidgetItem"
          @onPropertiesChange="
            (props) => onPropertiesChange(effect.type, props)
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetEffect, WidgetItem } from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
  inject: ['widgetEffectControls'],
  methods: {
    onPropertiesChange(type: string, props: any) {
      (this.$props.selectedWidgetItem as WidgetItem).setEffectProperties(
        type,
        props
      );
    },
    removeEffect(effect: WidgetEffect) {
      (this.$props.selectedWidgetItem as WidgetItem).removeEffect(effect.type);
    },
  },
});
</script>

<style scoped>
.existing-effects-wrapper {
}
.effect-wrapper {
  position: relative;
  background-color: #fdfdfd;
  padding: 0 5px 10px 5px;
}
.effect-wrapper:not(:last-child) {
  margin-bottom: 1px;
}
.remove-effect-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px 10px;
  cursor: pointer;
  font-size: 9pt;
}
.effect-header {
  margin: 0 -5px 0 -5px;
  padding: 5px;
  background-color: #bcdff0;
}
</style>
