<template></template>

<script>
import { defineComponent } from "@vue/composition-api";
import ScrollReveal from "scrollreveal";

export default defineComponent({
  props: {
    wrapperRef: HTMLDivElement,
    properties: Object,
  },
  data() {
    return {
      initialized: false,
    };
  },
  unmounted() {
    if (this.$props.wrapperRef) {
      ScrollReveal().clean(this.$props.wrapperRef);
    }
  },
  watch: {
    wrapperRef: {
      handler() {
        if (!this.$data.initialized && this.$props.wrapperRef) {
          this.$data.initialized = true;

          const sr = ScrollReveal(this.$props.properties);
          sr.reveal(this.$props.wrapperRef);
        }
      },
      immediate: true,
    },
  },
});
</script>
