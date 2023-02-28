<template>
  <div>
    <div v-if="widget.properties.tabsVisible" class="pages-menu-wrapper">
      <a
        v-for="(page, pageIndex) in sortedPages"
        :id="`pages-${widget.id}-${pageIndex}`"
        :key="pageIndex"
        class="pages-menu-item"
        :data-test="`pages-${widget.code}-${pageIndex}`"
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
        @click="
          () =>
            (widget.getState('viewedIndices') || []).includes(pageIndex) &&
            widget.onChangePageIndex(pageIndex)
        "
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div class="pages-content-item">
      <widgets-layout
        :widget-items="widgetItems"
        :exclude-widget-ids="[widget.id]"
        :only-include-widget-ids="
          sortedPages.length && currentPageIndex > -1
            ? sortedPages[currentPageIndex].children
            : undefined
        "
        :widgets-order="
          sortedPages.length && currentPageIndex > -1
            ? sortedPages[currentPageIndex].children
            : undefined
        "
        :for-parent="widget.id"
      />
    </div>
    <div
      v-if="widget.properties.navigationVisible"
      class="back-forward-wrapper"
    >
      <div>
        <button
          v-if="widget.hasPreviousButton()"
          class="back-forward-button"
          :disabled="
            widget.pageIndexHasLoadings(currentPageIndex) || widget.isSubmitting
          "
          @click="() => widget.toPreviousPage()"
        >
          {{ t(`__${widget.previousButtonType()}`, widget.id) }}
        </button>
      </div>
      <div>
        <button
          v-if="widget.hasNextButton()"
          class="back-forward-button"
          :class="{
            errors: widget.pageIndexHasErrors(currentPageIndex),
            submitting: widget.isSubmitting,
          }"
          :disabled="
            widget.pageIndexHasLoadings(currentPageIndex) ||
            widget.pageIndexHasErrors(currentPageIndex) ||
            widget.isSubmitting
          "
          @click="() => widget.toNextPage()"
        >
          {{ t(`__${widget.nextButtonType()}`, widget.id) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  PagesPropertiesPage,
  WidgetItem,
  WidgetControls,
  WidgetItems,
  PageState,
} from '@/entry.esm';
import { WidgetError } from '@/lib-components/interfaces';
import { defineComponent } from '@vue/composition-api';
import WidgetsLayout from '../../WidgetsLayout.vue';
import PagesWidgetItem from './PagesWidgetItem';

let WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true,
  },
  pageState: {
    type: Object as () => PageState,
    required: true,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true,
  },
  t: Function,
  properties: {
    type: Object,
    required: true,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false,
  },
};

export default defineComponent({
  components: { WidgetsLayout },
  props: {
    ...WidgetControlProps,
    widget: {
      type: Object as () => PagesWidgetItem,
      required: true,
    },
    t: Function,
  },
  data() {
    return {
      sortedPages: [],
    } as {
      sortedPages: PagesPropertiesPage[];
    };
  },
  computed: {
    currentPageIndex(): number {
      return (
        this.pageState?.widgetState?.[this.widget.id]?.currentPageIndex || 0
      );
    },
  },
  watch: {
    currentPageIndex: {
      handler() {
        const viewedIndices = this.widget.getState('viewedIndices') || [];
        if (!viewedIndices.includes(this.currentPageIndex)) {
          this.widget.setState('viewedIndices', [
            ...viewedIndices,
            this.currentPageIndex,
          ]);
        }
      },
      immediate: true,
    },
    'widget.properties.pages': {
      handler() {
        this.sortedPages = this.widget.getSortedPages();
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
.back-forward-button.submitting {
  opacity: 0.2;
}
</style>
