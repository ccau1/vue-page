<template>
  <div>
    <div class="pages-menu-wrapper" v-if="widget.properties.tabsVisible">
      <a
        class="pages-menu-item"
        :class="{
          active: currentPageIndex === pageIndex,
          errors: widget.pageIndexHasErrors(pageIndex, { allChildPages: true }),
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
            widget.onChangePageIndex(pageIndex)
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
          v-if="widget.hasPreviousButton()"
          @click="() => widget.toPreviousPage()"
        >
          {{ t(`__${widget.previousButtonType()}`, widget.id) }}
        </button>
      </div>
      <div>
        <button
          class="back-forward-button"
          :class="{ errors: widget.pageIndexHasErrors(currentPageIndex) }"
          :disabled="widget.pageIndexHasErrors(currentPageIndex)"
          v-if="widget.hasNextButton()"
          @click="() => widget.toNextPage()"
        >
          {{ t(`__${widget.nextButtonType()}`, widget.id) }}
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
    widgetItems: Object,
    formState: Object,
    setWidgetState: Function,
    wrapperRef: HTMLDivElement,
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
