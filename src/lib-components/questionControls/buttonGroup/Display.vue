<template>
  <div class="button-group-wrapper">
    <button
      :class="{
        isLast: index === options.length - 1,
        selected: value === option.value,
      }"
      v-for="(option, index) in options"
      :key="option.value"
      @click="() => onSelectChange(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { ButtonGroupProperties, WidgetItem, WidgetError } from '@/entry.esm';

interface Option {
  label: string;
  value: string;
}

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
    type: Boolean,
    required: true as const,
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
    properties: {
      type: Object as () => ButtonGroupProperties,
      required: true,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      options: [],
    } as {
      options: Option[];
    };
  },
  watch: {
    ['properties.options']: {
      handler() {
        // FIXME: need to handle on locale switch as well
        this.options = this.properties.options.map((opt) => ({
          value: opt.value,
          label: (this as any).t(opt.labelKey, this.widget!.id),
        }));
      },
      immediate: true,
    },
  },
  computed: {
    selectedValue(): Option | undefined {
      return this.options.find((o) => o.value === this.value);
    },
  },
  methods: {
    onSelectChange(value: string) {
      this.onChange?.(value);
    },
  },
});
</script>

<style scoped>
.button-group-wrapper {
  display: inline-flex;
  flex-direction: row;
  border: 1px solid #000;
  border-radius: 8px;
  overflow: hidden;
}
button {
  border: 1px solid transparent;
  cursor: pointer;
  background-color: #fff;
}
button:not(.isLast) {
  border-right-color: #000;
}
button.selected {
  background-color: #03a9f4;
  color: #fff;
}
</style>
