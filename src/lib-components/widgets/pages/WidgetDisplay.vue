<template>
  <div>
    <div class="pages-menu-wrapper" v-if="widget.properties.tabsVisible">
      <a
        class="pages-menu-item"
        :class="{
          active: currentPageIndex === pageIndex,
          errors: pageIndexHasErrors(pageIndex),
          unopened: !(widget.getState('viewedIndices') || []).includes(
            pageIndex
          ),
        }"
        :disabled="
          !(widget.getState('viewedIndices') || []).includes(pageIndex)
        "
        v-for="(page, pageIndex) in sortedPages"
        :key="pageIndex"
        v-on:click="
          () =>
            (widget.getState('viewedIndices') || []).includes(pageIndex) &&
            onChangePageIndex(pageIndex)
        "
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div
      class="pages-content-item"
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
    <div
      class="back-forward-wrapper"
      v-if="widget.properties.navigationVisible"
    >
      <div>
        <button
          class="back-forward-button"
          v-if="currentPageIndex > 0"
          @click="onPreviousPage"
        >
          Back
        </button>
      </div>
      <div>
        <button
          class="back-forward-button"
          :class="{ errors: pageIndexHasErrors(currentPageIndex) }"
          :disabled="pageIndexHasErrors(currentPageIndex)"
          v-if="currentPageIndex < sortedPages.length - 1"
          @click="onNextPage"
        >
          Next
        </button>
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
    currentPageIndex: {
      handler() {
        const viewedIndices = this.$props.widget.getState("viewedIndices");
        this.$props.widget.setState("viewedIndices", [
          ...new Set([...(viewedIndices || []), this.currentPageIndex]),
        ]);
      },
      immediate: true,
    },
    "widget.properties.pages": {
      handler() {
        this.$data.sortedPages = this.$props.widget.getSortedPages();
      },
      immediate: true,
    },
  },
  methods: {
    onChangePageIndex(toIndex) {
      if (toIndex < 0) return;
      if (toIndex > this.$data.sortedPages.length - 1) return;
      this.$props.widget.setState("currentPageIndex", toIndex);
    },
    onPreviousPage() {
      // TODO: use widget.properties.navigationIntegrateParentPaging
      // to check whether previous should jump to parent
      // previous page
      this.onChangePageIndex(this.currentPageIndex - 1);
    },
    onNextPage() {
      // TODO: use widget.properties.navigationIntegrateParentPaging
      // to check whether next should jump to parent
      // next page
      (async () => {
        const children = this.$props.widget.getChildren({ deep: true });
        const hasErrors = (
          await Promise.all(
            children.map(async (child) => {
              return child.runValidations();
            })
          )
        ).some((err) => err);
        if (!hasErrors) {
          this.onChangePageIndex(this.currentPageIndex + 1);
        }
      })();
    },
    pageIndexHasErrors(idx) {
      // get child errors
      const childErrors = this.$props.widget.getState("pageIdxErrors") || {};
      // if no childErrors, just return false
      if (!Object.keys(childErrors).length) return false;
      // map child error widget ids to pages children index
      // const children = this.$props.widget.getChildren();
      return Object.keys(childErrors[idx] || {}).length;
    },
  },
});
</script>

<style scoped>
.pages-menu-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
}
.pages-menu-item {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
}
.pages-menu-item.unopened {
  opacity: 0.3;
  cursor: default;
}
.pages-menu-item.active {
  border-bottom: 3px solid #03a9f4;
}

.pages-menu-item.errors {
  border-color: red;
}

/* .pages-content-item {
} */

.back-forward-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.back-forward-button {
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid transparent;
  background-color: #03a9f4;
  color: #fff;
  cursor: pointer;
}
.back-forward-button.errors {
  background-color: #f00;
  color: #fff;
  opacity: 0.2;
  cursor: default;
}
</style>
