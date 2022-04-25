<template>
  <div class="pane-wrapper" :class="{ isOpen }">
    <div
      v-if="position === 'left'"
      class="pane-content-wrapper left"
      :style="{ width: paneWidth + 'px' }"
    >
      <slot name="pane-content" />
    </div>
    <div
      class="pane-outside-wrapper"
      :style="{
        [position === 'left' ? 'marginLeft' : 'marginRight']: paneWidth + 'px',
      }"
    >
      <slot />
    </div>
    <div
      v-if="position === 'right'"
      class="pane-content-wrapper right"
      :style="{ width: paneWidth + 'px' }"
    >
      <slot name="pane-content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    position: {
      type: String,
      default: "left",
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    paneWidth: {
      type: Number,
      default: 300,
    },
  },
});
</script>

<style scoped>
.pane-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
}
.pane-outside-wrapper {
  flex: 1;
}
.pane-content-wrapper {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(201, 201, 201);
}
.pane-content-wrapper.left {
  left: 0;
}
.pane-content-wrapper.right {
  right: 0;
}
</style>
