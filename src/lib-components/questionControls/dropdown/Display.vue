<template>
  <div>
    <!-- <multiselect
      :value="selectedValue"
      :multiple="properties.multiple"
      :close-on-select="!properties.multiple"
      :placeholder="t('__placeholder', widget.id)"
      :options="options"
      track-by="value"
      label="label"
      :searchable="false"
      :show-labels="false"
      @input="onSelectChange"
    /> -->
    <select :value="value || ''" @change="onSelectChange">
      <option value="" disabled>{{ t("__placeholder", widget.id) }}</option>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :selected="value === option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { QuestionControlProps } from "../index";
// import Multiselect from "vue-multiselect";
// import "vue-multiselect/dist/vue-multiselect.min.css";

export default defineComponent<QuestionControlProps>({
  // components: { Multiselect },
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
  },
  inject: ["t"],
  data() {
    return {
      options: [],
    };
  },
  watch: {
    ["properties.options"]: {
      handler() {
        // FIXME: need to handle on locale switch as well
        this.$data.options = this.$props.properties.options.map(
          (opt: { labelKey: string; value: string }) => ({
            value: opt.value,
            label: (this as any).t(opt.labelKey, this.$props.widget.id),
          })
        );
      },
      immediate: true,
    },
  },
  computed: {
    selectedValue() {
      return (
        this.$data.options as Array<{ label: string; value: string }>
      ).find((o) => o.value === this.$props.value);
    },
  },
  methods: {
    onSelectChange(ev: Event) {
      this.$props.onChange((ev.target as HTMLSelectElement).value);
    },
    // onSelectChange(selectedValue: { value: string; label: string }) {
    //   if (!selectedValue) return;
    //   this.$props.onChange(selectedValue.value);
    // },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
