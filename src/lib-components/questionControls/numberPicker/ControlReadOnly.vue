<template>
  <div>
    {{ value || widget.properties.controlData.default }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: Number,
  },
  inject: ["t"],
})
export default class NumberPickerControl extends Vue {}
</script>
