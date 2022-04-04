<template>
  <div>
    <label>
      <input type="checkbox" :name="widget.id" />
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
  },
  created() {},
  inject: ["t"],
})
export default class CheckboxControl extends Vue {}
</script>
