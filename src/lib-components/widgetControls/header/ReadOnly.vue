<template>
  <component
:is="widget.properties.tagType" class="header"
>
    {{ t('__label') }}
  </component>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>

<style scoped>
.header {
  padding: 0 10px;
}
</style>
