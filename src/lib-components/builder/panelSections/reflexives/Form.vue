<template>
  <div v-if="selectedWidgetItem">
    <div
      v-for="(condition, conditionIndex) in selectedWidgetItem.reflexiveRules"
      :key="conditionIndex"
      class="condition-wrapper"
    >
      <label>condition {{ conditionIndex + 1 }}</label>
      <div class="condition-fields-wrapper">
        <input type="text" :value="condition.fact" />
        <select>
          <option value="in" :selected="condition.operator === 'in'">in</option>
          <option value="equal" :selected="condition.operator === 'equal'">
            equals
          </option>
          <option
            value="notEqual"
            :selected="condition.operator === 'notEqual'"
          >
            not equal
          </option>
          <option
            value="greaterThanInclusive"
            :selected="condition.operator === 'greaterThanInclusive'"
          >
            >=
          </option>
          <option
            value="lessThanInclusive"
            :selected="condition.operator === 'lessThanInclusive'"
          >
            {{ "<=" }}
          </option>
        </select>
        <input type="text" :value="conditionValue(condition.value)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetEffect, WidgetItem } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widgetItems: Object,
    selectedWidgetItem: Object,
  },
  inject: ["t", "widgetEffectControls"],
  methods: {
    conditionValue(value: any) {
      if (Array.isArray(value)) {
        return value.join(", ");
      } else if (value === null) {
        return "null";
      } else if (value === undefined) {
        return "undefined";
      } else {
        return value;
      }
    },
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
input,
select,
textarea {
  border-width: 0 0 1px 0;
}
.sub-header {
  margin: 0;
  padding: 5px;
  background-color: #bcdff0;
}
.condition-wrapper {
  padding: 10px 5px;
  margin-bottom: 10px;
}
.condition-wrapper > label {
  display: block;
  margin-bottom: 5px;
  font-size: 9pt;
}
.condition-fields-wrapper {
  display: flex;
  flex-direction: row;
}
.condition-fields-wrapper > input {
  width: 0;
}
.condition-fields-wrapper > * {
  flex: 1;
}
.error-message-wrapper {
  padding: 10px 5px;
}
.error-message-wrapper label {
  display: block;
  font-size: 9pt;
  margin-bottom: 5px;
}
.error-message-wrapper textarea {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  min-height: 40px;
  color: red;
}
</style>
