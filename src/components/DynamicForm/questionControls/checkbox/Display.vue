<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="isChecked"
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
    data: Object,
    widget: Object,
    onChange: Function,
    value: Object,
  },
  inject: ["t"],
  computed: {
    isChecked() {
      return !!this.$props.value?.checked;
    },
  },
  methods: {
    onToggle(ev) {
      this.$props.onChange({ checked: ev.target.checked });
    },
  },
})
export default class CheckboxControl extends Vue {}
</script>
