<template>
  <div class="main-wrapper">
    <widgets-layout
      :widgetControls="combWidgetControls"
      :widgetItems="widgetItems"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { widgets as sysWidgets } from "./widgetControls";
import { widgetEffects as sysWidgetEffectControls } from "./widgetEffectControls";
import { questionControls as sysQuestionControls } from "./questionControls";
import { shape, arrayOf, string, bool, instanceOf } from "vue-types";
import { Page, Widget } from ".";
import { PageState } from "./models/PageState";
import WidgetsLayout from "./WidgetsLayout.vue";
import { WidgetItem } from "./models/WidgetItem";
import { WidgetItemConstructorOptions, WidgetItems } from "@/entry.esm";
import { cachedMerge } from "./utils";
import { PageEventListener } from "./models/PageEventListener";

interface VuePageProps {
  languages: { [widgetId: string]: { [key: string]: string } | string };
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
  components: { WidgetsLayout },
  props: {
    languages: Object,
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
      pageEventListener: new PageEventListener({
        emitEvent: (this as any).emitEvent,
      }),
    } as {
      widgetItems: WidgetItems;
      pageEventListener: PageEventListener;
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
              pageEventListener: this.pageEventListener,
              emitEvent: this.emitEvent,
              t: (key: string, data?: { [key: string]: any }) =>
                this.t(`${widget.id}.${key}`, data),
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
            } as WidgetItemConstructorOptions);
            return obj;
          },
          {}
        );
        Object.values(this.$data.widgetItems).forEach((widgetItem) => {
          widgetItem.setWidgetItems(this.$data.widgetItems);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    t(key: string | string[], data?: { [key: string]: any }) {
      const lang = (typeof key === "string" ? key.split(".") : key).reduce<
        { [key: string]: any } | string
      >((obj, g) => {
        if (typeof obj === "string") return obj;
        return obj?.[g];
      }, this.languages) as string;

      return lang?.replace(
        /(\{(\w+)\})/g,
        (_orig: string, _outer: string, inner: string) => (data || {})[inner]
      );
    },
    async emitEvent(name: string, value?: any, widget?: WidgetItem) {
      if (Array.isArray(this.$listeners.event)) {
        await Promise.all(
          this.$listeners.event.map((evFn) =>
            evFn({
              name,
              value,
              widget,
              pageState: this.pageState,
              widgetItems: this.$data.widgetItems,
            })
          )
        );
      } else {
        await this.$listeners.event?.({
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.$data.widgetItems,
        });
      }
    },
  },
  provide() {
    return {
      getView: () => this.$props.view,
      t: this.t,
      pageEventListener: this.pageEventListener,
      languages: this.$props.languages,
      getPageState: () => this.$props.state,
      setPageState: (newPageState: PageState) => {
        this.$emit("onStateChange", newPageState);
      },
      emitEvent: this.emitEvent,
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
</style>
