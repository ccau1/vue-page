<template>
  <div>
    {{ value }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    data: Object,
    widget: Object,
    onChange: Function,
    value: String,
  },
  inject: ["t"],
})
export default class RadioControl extends Vue {}
</script>
