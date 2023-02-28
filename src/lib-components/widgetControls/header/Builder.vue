<template>
  <component class="header" :is="widget.properties.tagType">
    <input
      type="text"
      :value="t('__label', widget.id)"
      @input="onTextChange"
      class="header-input"
    />
  </component>
</template>

<script lang="ts">
import { Widget, WidgetControlProps } from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: WidgetControlProps,
  inject: ['getLocale', 'setMessage'],
  methods: {
    onTextChange(val: Event) {
      (this as any).setMessage({
        id: (this.$props.widget as Widget).id,
        locale: (this as any).getLocale(),
        key: '__label',
        value: (val.target as HTMLInputElement).value,
      });
    },
  },
});
</script>

<style scoped>
.header {
}
.header-input {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
}
</style>
