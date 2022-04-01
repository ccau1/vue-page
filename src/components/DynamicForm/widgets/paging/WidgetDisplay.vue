<template>
  <div>
    <div class="paging-menu-wrapper">
      <a
        class="paging-menu-item"
        :class="{ active: currentPageIndex === pageIndex }"
        v-for="(page, pageIndex) in widget.data.pages"
        :key="pageIndex"
        v-on:click="() => setWidgetState('currentPageIndex', pageIndex)"
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div
      class="paging-content-item"
      v-for="(page, pageIndex) in widget.data.pages"
      :key="pageIndex"
    >
      <div v-if="currentPageIndex === pageIndex">
        <div v-for="(child, childIndex) in page.children" :key="childIndex">
          <widgets-display
            :widgets="widgets"
            :formWidgets="formWidgets"
            :excludeWidgetIds="[widget.id]"
            :forParent="widget.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetsDisplay from "../../WidgetsDisplay.vue";

export default defineComponent({
  components: { WidgetsDisplay },
  props: {
    widget: Object,
    widgets: Object,
    formWidgets: Object,
    formState: Object,
    setWidgetState: Function,
  },
  inject: ["t", "onFormStateChange"],
  computed: {
    currentPageIndex() {
      return (
        this.formState.widgetState?.[this.$props.widget.id]?.currentPageIndex ||
        0
      );
    },
  },
  watch: {
    formStateCurrentPageIndex: {
      handler(newPageIndex) {
        console.log("updated currentPageIndex", newPageIndex);
        this.$data.currentPageIndex = newPageIndex;
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.paging-menu-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
}
.paging-menu-item {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}

.paging-menu-item.active {
  background-color: #e8e8e8;
}

/* .paging-content-item {
} */
</style>
