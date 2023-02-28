<template />

<script>
import { defineComponent } from '@vue/composition-api';
import ScrollReveal from 'scrollreveal';

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
  computed: {
    watchWrapperPropsChange() {
      return {
        properties: this.properties,
        wrapperRef: this.wrapperRef,
      };
    },
  },
  watch: {
    watchWrapperPropsChange: {
      handler({ properties, wrapperRef }) {
        if (!wrapperRef) return;
        ScrollReveal().clean(wrapperRef);
        // generate a new scroll reveal and reveal it
        const sr = ScrollReveal(properties);
        sr.reveal(wrapperRef);
      },
      immediate: true,
    },
  },
  unmounted() {
    if (this.wrapperRef) {
      ScrollReveal().clean(this.wrapperRef);
    }
  },
});
</script>
