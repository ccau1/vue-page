<template>
  <div>
    <div
      v-for="(page, pageIndex) in widgetItem.properties.pages"
      :key="pageIndex"
    >
      <div class="page-label">
        <small
          ><input
            :value="t(page.labelKey, widgetItem.id)"
            @change="(ev) => onPageLabelChange(pageIndex, ev.target.value)"
        /></small>
      </div>

      <builder-widget-tree
        :widgetItems="widgetItems"
        :level="1"
        :listIds="page.children"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetItem } from "@/entry.esm";
import BuilderWidgetTree from "@/lib-components/builder/BuilderWidgetTree.vue";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: { BuilderWidgetTree },
  props: {
    widgetItems: Object,
    widgetItem: Object,
    parentId: String,
    level: Number,
  },
  inject: ["t", "setMessage", "getLocale"],
  methods: {
    onPageLabelChange(pageIndex: number, label: string) {
      (this as any).setMessage({
        id: (this.$props.widgetItem as WidgetItem).id,
        locale: (this as any).getLocale(),
        key: (this.$props.widgetItem as WidgetItem).properties.pages[pageIndex]
          .labelKey,
        value: label,
      });
    },
  },
});
</script>

<style scoped>
.page-label {
  padding: 6px;
}
.page-label input {
  border: none;
  outline: none;
}
</style>
