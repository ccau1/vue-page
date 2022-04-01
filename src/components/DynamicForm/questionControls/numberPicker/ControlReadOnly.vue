<template>
  <div>
    {{ value || widget.data.controlData.default }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    data: Object,
    widget: Object,
    onChange: Function,
    value: Number,
  },
  inject: ["t"],
})
export default class NumberPickerControl extends Vue {}
</script>
