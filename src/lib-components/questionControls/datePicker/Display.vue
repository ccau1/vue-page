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
import {
  formatDateString,
  getDateByPropertyValue,
  WidgetItem,
  WidgetError,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

const QuestionControlProps = {
  properties: {
    type: Object,
    required: true as const,
  },
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: String,
  },
  t: {
    type: Function,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export default defineComponent({
  props: {
    ...QuestionControlProps,
    value: {
      type: String,
    },
  },
  created() {
    if (!this.value) this.onChange?.(this.$data.defaultDate);
  },
  data() {
    return {
      defaultDate: formatDateString(
        getDateByPropertyValue(this.properties?.defaultDate) as Date
      ),
      minDate: formatDateString(
        getDateByPropertyValue(this.properties?.minDate) as Date
      ),
      maxDate: formatDateString(
        getDateByPropertyValue(this.properties?.maxDate) as Date
      ),
    };
  },
  methods: {
    onDateChange(newDate: Event) {
      this.onChange?.((newDate.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
