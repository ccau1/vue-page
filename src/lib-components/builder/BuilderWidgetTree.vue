<template>
  <div class="tree-level-wrapper">
    <div
      v-for="widgetItem in filteredWidgetItems"
      :key="widgetItem.id"
      class="tree-item"
      :style="{ marginLeft: `${(level || 0) * 10}px` }"
    >
      <div class="tree-item-box">
        <span class="drag-icon">&#9783;</span>
        <p>{{ widgetItem.type }}</p>
        <small>{{ widgetItem.code }}</small>
      </div>
      <template v-if="widgetControls[widgetItem.type].widgetTree">
        <component
          :is="widgetControls[widgetItem.type].widgetTree"
          :widgetItems="widgetItems"
          :widgetItem="widgetItem"
          :parentId="widgetItem.id"
          :level="1"
        />
      </template>
      <template v-else>
        <builder-widget-tree
          :widgetItems="widgetItems"
          :parentId="widgetItem.id"
          :level="1"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetItem, WidgetItems } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "BuilderWidgetTree",
  props: {
    widgetItems: Object,
    parentId: String,
    // this overrides parentId, as this represents
    // the final list to display for this level
    listIds: Array,
    level: Number,
  },
  inject: ["widgetControls"],
  data() {
    return {
      filteredWidgetItems: [],
    } as { filteredWidgetItems: WidgetItem[] };
  },
  computed: {
    changes() {
      return {
        listIds: (this as any).$props.listIds,
        parentId: (this as any).$props.parentId,
      };
    },
  },
  watch: {
    changes: {
      handler({
        listIds,
        parentId,
      }: {
        listIds?: string[];
        parentId?: string;
      }) {
        if (listIds) {
          this.$data.filteredWidgetItems = listIds.map(
            (id) => (this.$props.widgetItems as WidgetItems)[id]
          );
        } else {
          this.$data.filteredWidgetItems = Object.values(
            this.$props.widgetItems as WidgetItems
          ).filter((wi) => wi.parentId === parentId);
        }
      },
      immediate: true,
    },
  },
});
</script>

<style scoped>
.tree-item-box {
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  padding: 5px;
  margin: 2px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tree-item-box > * {
  margin: 0;
  margin-right: 5px;
}
.tree-item-box small {
  color: #a1a1a1;
}
.drag-icon {
  cursor: grab;
}
.drag-icon:active {
  cursor: grabbing;
}
</style>
