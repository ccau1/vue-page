<template>
  <pane :position="'left'" :isOpen="true">
    <template v-slot:pane-content>
      LEFT: locale setting, add widget list, current layout, etc...
    </template>
    <template>
      <slot />
    </template>
  </pane>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Pane from "./components/Pane.vue";

export default defineComponent({
  components: { Pane },
});
</script>

<style scoped></style>
