<template>
  <div>
    <div v-if="widget.properties.tabsVisible" class="pages-menu-wrapper">
      <a
        v-for="(page, pageIndex) in sortedPages"
        :key="pageIndex"
        class="pages-menu-item"
        :class="{
          active: currentPageIndex === pageIndex,
          errors: widget.pageIndexHasErrors(pageIndex, { allChildPages: true }),
          unopened: !(widget.getState('viewedIndices') || []).includes(
            pageIndex
          ),
        }"
        @click="() => widget.onChangePageIndex(pageIndex)"
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div class="pages-content-item">
      <builder-widgets-layout
        :widget-items="widgetItems"
        :exclude-widget-ids="[widget.id]"
        :only-include-widget-ids="
          sortedPages.length && currentPageIndex > -1
            ? sortedPages[currentPageIndex].children
            : []
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
          @click="() => widget.toPreviousPage()"
        >
          {{ t(`__${widget.previousButtonType()}`, widget.id) }}
        </button>
      </div>
      <div>
        <button
          v-if="widget.hasNextButton()"
          class="back-forward-button"
          :class="{ errors: widget.pageIndexHasErrors(currentPageIndex) }"
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
  WidgetItem,
  WidgetControls,
  WidgetItems,
  PageState,
  WidgetError,
  PagesPropertiesPage,
  PagesProperties,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';
import BuilderWidgetsLayout from '../../builder/BuilderWidgetsLayout.vue';
import WidgetsLayout from '../../WidgetsLayout.vue';
import PagesWidgetItem from './PagesWidgetItem';

const WidgetControlProps = {
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  widgetControls: {
    type: Object as () => WidgetControls,
    required: true as const,
  },
  widgetItems: {
    type: Object as () => WidgetItems,
    required: true as const,
  },
  pageState: {
    type: Object as () => PageState,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  wrapperRef: {
    type: HTMLDivElement,
    required: true as const,
  },
  t: Function,
  properties: {
    type: Object as () => PagesProperties,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: String,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

export default defineComponent({
  components: { WidgetsLayout, BuilderWidgetsLayout },
  props: {
    ...WidgetControlProps,
    widget: {
      type: PagesWidgetItem,
      required: true,
    },
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
        this.pageState.widgetState?.[this.widget.id]?.currentPageIndex || 0
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
</style>
