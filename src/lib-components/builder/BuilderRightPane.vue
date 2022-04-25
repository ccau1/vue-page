<template>
  <pane :position="'right'" :isOpen="true">
    <template v-slot:pane-content> testing </template>
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

<style scoped>
.pane-wrapper {
  display: flex;
  flex-direction: row;
}
.pane-content-wrapper {
  flex: 1;
  background-color: #fafafa;
}
.builder-right-pane-wrapper {
  width: 300px;
  align-items: stretch;
  background-color: #fff;
  border-left: 1px solid #a8a8a8;
}
</style>
