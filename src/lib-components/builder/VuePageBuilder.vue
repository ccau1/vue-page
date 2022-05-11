<template>
  <div class="main-wrapper">
    <builder-left-pane :widgetItems="widgetItems">
      <builder-right-pane :widgetItems="widgetItems">
        <div class="widgets-layout-wrapper">
          <div class="widgets-layout-inner-wrapper">
            <builder-widgets-layout
              :widgetControls="combWidgetControls"
              :widgetItems="widgetItems"
            />
          </div>
        </div>
      </builder-right-pane>
    </builder-left-pane>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { widgets as sysWidgets } from "../widgetControls";
import { widgetEffects as sysWidgetEffectControls } from "../widgetEffectControls";
import { questionControls as sysQuestionControls } from "../questionControls";
import { shape, arrayOf, string, bool, instanceOf } from "vue-types";
import { Page, Widget } from "..";
import { PageState } from "../models/PageState";
import BuilderWidgetsLayout from "./BuilderWidgetsLayout.vue";
import { WidgetItem } from "../models/WidgetItem";
import {
  BuilderWidgetLanguages,
  WidgetItems,
  WidgetLanguage,
} from "@/entry.esm";
import { cachedMerge } from "../utils";
import BuilderRightPane from "./BuilderRightPane.vue";
import BuilderLeftPane from "./BuilderLeftPane.vue";

interface VuePageProps {
  languages: BuilderWidgetLanguages;
  locale: string;
  page: Page;
  onPageChange: (newPage: Page) => void;
  state: PageState;
  onStateChange: (newState: PageState) => void;
  widgetControls?: WidgetItems;
  questionControls?: Object;
  widgetEffectControls?: Object;
  view?: "display" | "readOnly";
  plugins?: Array<{
    widgetControls?: Object;
    questionControls?: Object;
    widgetEffectControls?: Object;
  }>;
  configs: {
    widgets: {
      disableInternalControls: boolean;
      blacklist: string[];
      whitelist: string[];
      filters: { [key: string]: any };
    };
    questionControls: {
      disableInternalControls: boolean;
      blacklist: string[];
      whitelist: string[];
      filters: { [key: string]: any };
    };
    widgetEffectControls: {
      disableInternalControls: boolean;
      blacklist: string[];
      whitelist: string[];
      filters: { [key: string]: any };
    };
  };
}

interface VuePageData {
  widgetItems: WidgetItems;
}

export default defineComponent<VuePageProps, any, VuePageData>({
  components: { BuilderWidgetsLayout, BuilderRightPane, BuilderLeftPane },
  // components: { DynamicPageLayout },
  props: {
    languages: Object,
    locale: String,
    page: Object as () => Page,
    // eslint-disable-next-line no-unused-vars
    onPageChange: Function, // func<(page: Page) => void>().isRequired,
    state: instanceOf(PageState).isRequired,
    // eslint-disable-next-line no-unused-vars
    onStateChange: Function, // func<(state: PageState) => void>().isRequired,
    widgetControls: Object, // shape(QuestionControl),
    questionControls: Object,
    plugins: arrayOf(
      shape({
        widgetControls: Object,
        widgetEffectControls: Object,
        questionControls: Object,
      })
    ),
    // display | page | readOnly
    view: String,
    configs: shape({
      widgets: shape({
        // whether or not to use controls
        disableInternalControls: bool(),
        blacklist: arrayOf(string()),
        whitelist: arrayOf(string()),
        filters: Object,
      }),
      questionControls: shape({
        // whether or not to use controls
        //
        disableInternalControls: bool(),
        blacklist: arrayOf(string()),
        whitelist: arrayOf(string()),
        filters: Object,
      }),
    }),
  },
  data() {
    return {
      widgetItems: {},
    } as {
      widgetItems: WidgetItems;
    };
  },
  computed: {
    widgetItemsArr() {
      return this.$props.page.widgets;
    },
    combWidgetControls() {
      return cachedMerge(
        "widgetControls",
        this.$props.configs?.widgets.disableInternalControls ? {} : sysWidgets,
        ...(this.$props.plugins || [])?.map((p) => p.widgetControls),
        this.$props.widgetControls
      );
    },
    combWidgetEffectControls() {
      return cachedMerge(
        "widgetEffectControls",
        this.$props.configs?.widgetEffectControls.disableInternalControls
          ? {}
          : sysWidgetEffectControls,
        ...(this.$props.plugins || [])?.map((p) => p.widgetEffectControls),
        this.$props.widgetEffectControls
      );
    },
    combQuestionControls() {
      return cachedMerge(
        "questionControls",
        this.$props.configs?.questionControls.disableInternalControls
          ? {}
          : sysQuestionControls,
        ...(this.$props.plugins || [])?.map((p) => p.questionControls),
        this.$props.questionControls
      );
    },
    pageState() {
      return this.$props.state;
    },
  },
  watch: {
    "page.widgets": {
      handler(newPageWidgetArr) {
        this.$data.widgetItems = newPageWidgetArr.reduce(
          (obj: { [widgetId: string]: WidgetItem }, widget: Widget) => {
            const WidgetItemClass =
              this.combWidgetControls[widget.type]?.widgetItem || WidgetItem;
            obj[widget.id] = new WidgetItemClass({
              widget,
              removeWidget: this.removeWidget,
              getState: () => this.$props.state,
              setState: (newPageState: PageState) => {
                this.$emit("onStateChange", newPageState);
              },
              onUpdate: (newWidget: WidgetItem) => {
                this.$props.onPageChange?.({
                  ...this.$props.page,
                  widgets: Object.values({
                    ...this.$data.widgetItems,
                    [newWidget.id]: newWidget,
                  }),
                });
              },
            });
            return obj;
          },
          {}
        );
        Object.values(this.$data.widgetItems).forEach((widgetItem) => {
          (widgetItem as WidgetItem).setWidgetItems(this.$data.widgetItems);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    t(key: string, groupId?: string) {
      let lang: {
        [locale: string]: { [locale: string]: WidgetLanguage } | WidgetLanguage;
      } = this.languages;
      if (groupId) {
        lang = groupId.split(".").reduce<{
          [key: string]: any;
        }>((obj, g) => {
          return obj?.[g];
        }, lang) as { [locale: string]: WidgetLanguage };
      }

      return (lang?.[this.$props.locale] as WidgetLanguage)?.message[key];
    },
    setMessage({
      id,
      locale,
      key,
      value,
      type = "pageItem",
    }: {
      id: string;
      locale: string;
      key: string;
      value: string;
      type?: string;
    }) {
      const newLanguages = { ...this.$props.languages };
      if (!newLanguages[id]) newLanguages[id] = {};
      if (!newLanguages[id][locale])
        newLanguages[id][locale] = {
          id: "",
          refId: id,
          type,
          version: 1,
          locale,
          message: {},
        };

      newLanguages[id][locale].message[key] = value;
      this.$emit("onLanguageChange", newLanguages);
    },
    updatePage(page: Page) {
      this.$emit("onPageChange", page);
    },
    updateWidget(widget: WidgetItem) {
      this.$data.widgetItems[widget.id] = widget;
      this.updatePage({
        ...this.$props.page,
        widgets: Object.values(this.$data.widgetItems).map((m) => m.widget),
      });
    },
    removeWidget(widgetId: string) {
      this.updatePage({
        ...this.$props.page,
        widgets: Object.keys(this.$data.widgetItems).reduce<Widget[]>(
          (arr, _widgetId) => {
            if (_widgetId === widgetId) return arr;
            return [...arr, this.$data.widgetItems[_widgetId].widget];
          },
          []
        ),
      });
      // remove languages
      const newLanguages = { ...this.$props.languages };
      delete newLanguages[widgetId];
      this.$emit("onLanguageChange", newLanguages);
    },
  },
  provide() {
    return {
      getView: () => this.$props.view,
      t: (this as any).t,
      getLocale: () => this.$props.locale,
      languages: this.$props.languages,
      setMessage: (this as any).setMessage,
      updateWidget: (this as any).updateWidget,
      removeWidget: (this as any).removeWidget,
      getPageState: () => this.$props.state,
      setPageState: (newPageState: PageState) => {
        this.$emit("onStateChange", newPageState);
      },
      widgetEffectControls: this.combWidgetEffectControls,
      widgetControls: this.combWidgetControls,
      questionControls: this.combQuestionControls,
    };
  },
});
</script>

<style scoped>
.main-wrapper {
  font-family: Arial, Helvetica, sans-serif;
}
.widgets-layout-wrapper {
  padding: 30px;
  background-color: #eaedf5;
  height: 100%;
  box-sizing: border-box;
}
.widgets-layout-inner-wrapper {
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
