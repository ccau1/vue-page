<template>
  <div>
    <div class="paging-menu-wrapper">
      <a
        class="paging-menu-item"
        :class="{
          active: currentPageIndex === pageIndex,
          errors: pageIndexHasErrors(pageIndex),
        }"
        v-for="(page, pageIndex) in sortedPages"
        :key="pageIndex"
        v-on:click="() => widget.setState('currentPageIndex', pageIndex)"
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div
      class="paging-content-item"
      v-for="(page, pageIndex) in sortedPages"
      :key="pageIndex"
    >
      <div v-if="currentPageIndex === pageIndex">
        <widgets-layout
          :widgets="widgets"
          :widgetItems="widgetItems"
          :excludeWidgetIds="[widget.id]"
          :onlyIncludeWidgetIds="page.children"
          :forParent="widget.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetsLayout from "../../WidgetsLayout.vue";

export default defineComponent({
  components: { WidgetsLayout },
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
  },
  data() {
    return {
      sortedPages: [],
    };
  },
  inject: ["t"],
  computed: {
    currentPageIndex() {
      return (
        this.formState.widgetState?.[this.$props.widget.id]?.currentPageIndex ||
        0
      );
    },
  },
  watch: {
    "widget.data.pages": {
      handler() {
        this.$data.sortedPages = this.$props.widget.getSortedPages();
      },
      immediate: true,
    },
  },
  methods: {
    pageIndexHasErrors(idx) {
      // get child errors
      const childErrors = this.$props.widget.getState("pageIdxErrors") || {};
      // if no childErrors, just return false
      if (!Object.keys(childErrors).length) return false;
      // map child error widget ids to paging children index
      // const children = this.$props.widget.getChildren();
      return Object.keys(childErrors[idx] || {}).length;
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
  border: 1px solid transparent;
}

.paging-menu-item.active {
  background-color: #e8e8e8;
}

.paging-menu-item.errors {
  border-color: red;
}

/* .paging-content-item {
} */
</style>
