<template>
  <div>
    <div
      v-for="(page, pageIndex) in sortedPages"
      :key="pageIndex"
      class="page-wrapper"
    >
      <div
        class="page-label"
        v-if="!widget.getParentPagesWidgets({ first: true })"
      >
        {{ t(page.labelKey, widget.id) }}
      </div>
      <div>
        <div class="questions-wrapper">
          <template
            v-for="questionWidgetId in page.children.filter((c) =>
              ['question'].includes(widgetItems[c].type)
            )"
          >
            <div
              v-if="t('__label', questionWidgetId)"
              class="question"
              :key="questionWidgetId"
            >
              <label class="question-label">{{
                t("__label", questionWidgetId)
              }}</label>
              <p>{{ pageState.widgetState[questionWidgetId].response }}</p>
            </div>
          </template>
        </div>
        <pages-read-only
          v-for="pagesWidgetId in page.children.filter((c) =>
            ['pages'].includes(widgetItems[c].type)
          )"
          :key="pagesWidgetId"
          :widget="widgetItems[pagesWidgetId]"
          :widgets="widgets"
          :widgetItems="widgetItems"
          :pageState="pageState"
          :setWidgetState="setWidgetState"
        />
        <!-- TODO: handle section as well -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetsLayout from "../../WidgetsLayout.vue";

export default defineComponent({
  name: "PagesReadOnly",
  components: { WidgetsLayout },
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
    pageState: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
    wrapperRef: HTMLDivElement,
    t: Function,
  },
  data() {
    return {
      sortedPages: this.$props.widget.getSortedPages(),
    };
  },
});
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: row;
}
.page-wrapper > *:last-child {
  flex: 1;
}
.page-label {
  padding: 0 10px 0 0;
}
.question-label {
  font-weight: bold;
}
.questions-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.question {
  width: 33%;
}
</style>
