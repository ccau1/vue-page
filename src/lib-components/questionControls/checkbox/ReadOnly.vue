<template>
  <div>
    {{ !!value }}
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
})
export default class CheckboxControl extends Vue {}
</script>
