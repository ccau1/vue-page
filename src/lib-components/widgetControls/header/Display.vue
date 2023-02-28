<template>
  <component
:is="widget.properties.tagType" class="header"
>
    {{ t('__label', widget.id) }}
  </component>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>

<style scoped>
.header {
}
</style>
