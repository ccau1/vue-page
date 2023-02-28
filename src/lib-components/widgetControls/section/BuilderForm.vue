<template>
  <div>section builder form</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  inject: ['updateWidget'],
  props: {
    widget: Object,
  },
});
</script>
