<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="value"
        :name="widget.id"
        v-on:click="onToggle"
      />
      {{ t("__checkboxLabel", widget.id) }}
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
    value: Boolean,
  },
  inject: ["t"],
  methods: {
    onToggle(ev) {
      this.$props.onChange(ev.target.checked);
    },
  },
})
export default class CheckboxControl extends Vue {}
</script>
