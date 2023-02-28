<template>
  <div>
    {{ !!value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    errors: Array,
    t: Function,
  },
});
</script>
