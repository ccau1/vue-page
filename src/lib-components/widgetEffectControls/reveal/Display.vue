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
  computed: {
    watchWrapperPropsChange() {
      console.log("has changed", {
        properties: this.$props.properties,
        wrapperRef: this.$props.wrapperRef,
      });
      return {
        properties: this.$props.properties,
        wrapperRef: this.$props.wrapperRef,
      };
    },
  },
  watch: {
    watchWrapperPropsChange: {
      handler({ properties, wrapperRef }) {
        if (!wrapperRef) return;
        console.log("clean scroll reveal");
        ScrollReveal().clean(wrapperRef);
        // generate a new scroll reveal and reveal it
        const sr = ScrollReveal(properties);
        sr.reveal(wrapperRef);
        console.log("revealed");
      },
      immediate: true,
    },
  },
});
</script>
