<template>
  <div>
    <input
      type="date"
      :value="value || defaultDate"
      :min="minDate"
      :max="maxDate"
      @change="onDateChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { QuestionControlProps } from "../index";
import { formatDateString, getDateByPropertyValue } from "./utils";

export default defineComponent<QuestionControlProps>({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
  },
  inject: ["t"],
  data() {
    return {
      defaultDate: formatDateString(
        getDateByPropertyValue(this.$props.properties.defaultDate)
      ),
      minDate: formatDateString(
        getDateByPropertyValue(this.$props.properties.minDate)
      ),
      maxDate: formatDateString(
        getDateByPropertyValue(this.$props.properties.maxDate)
      ),
    };
  },
  methods: {
    onDateChange(newDate: Event) {
      this.$props.onChange((newDate.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
