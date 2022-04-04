<template>
  <div>
    <label
      class="radio-item"
      v-for="option in properties.options"
      :key="option.value"
    >
      <input
        type="radio"
        v-on:change="onSelect"
        :checked="value === option.value"
        :value="option.value"
        :name="widget.id"
      />
      {{ t(option.labelKey, widget.id) }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
  },
  inject: ["t"],
  methods: {
    onSelect(ev) {
      this.$props.onChange(ev.target.value);
    },
  },
})
export default class RadioControl extends Vue {}
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
