<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="value"
        :name="widget.id"
        v-on:click="onToggle"
      />
      {{ t('__checkboxLabel', widget.id) }}
    </label>
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
  methods: {
    onToggle(ev: Event) {
      this.$props.onChange?.((ev.target as HTMLInputElement).checked);
    },
  },
});
</script>
