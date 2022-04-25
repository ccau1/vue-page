<template>
  <div class="main-wrapper">
    <builder-left-pane>
      <builder-right-pane>
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
import { Form, Widget } from "..";
import { FormState } from "../models/FormState";
import BuilderWidgetsLayout from "./BuilderWidgetsLayout.vue";
import WidgetItem from "../models/WidgetItem";
import { BuilderWidgetLanguages, WidgetItems } from "@/entry.esm";
import { cachedMerge } from "../utils";
import BuilderRightPane from "./BuilderRightPane.vue";
import BuilderLeftPane from "./BuilderLeftPane.vue";

interface VuePageProps {
  languages: BuilderWidgetLanguages;
  locale: string;
  form: Form;
  onFormChange: (newForm: Form) => void;
  state: FormState;
  onStateChange: (newState: FormState) => void;
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
  // components: { DynamicFormLayout },
  props: {
    languages: Object,
    locale: String,
    form: Object as () => Form,
    // eslint-disable-next-line no-unused-vars
    onFormChange: Function, // func<(form: Form) => void>().isRequired,
    state: instanceOf(FormState).isRequired,
    // eslint-disable-next-line no-unused-vars
    onStateChange: Function, // func<(state: FormState) => void>().isRequired,
    widgetControls: Object, // shape(QuestionControl),
    questionControls: Object,
    plugins: arrayOf(
      shape({
        widgetControls: Object,
        widgetEffectControls: Object,
        questionControls: Object,
      })
    ),
    // display | form | readOnly
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
      return this.$props.form.widgets;
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
    formState() {
      return this.$props.state;
    },
  },
  watch: {
    "form.widgets": {
      handler(newFormWidgetArr) {
        this.$data.widgetItems = newFormWidgetArr.reduce(
          (obj: { [widgetId: string]: WidgetItem }, widget: Widget) => {
            const WidgetItemClass =
              this.combWidgetControls[widget.type]?.widgetItem || WidgetItem;
            obj[widget.id] = new WidgetItemClass({
              widget,
              getState: () => this.$props.state,
              setState: (newFormState: FormState) => {
                this.$emit("onStateChange", newFormState);
              },
              onUpdate: (newWidget: WidgetItem) => {
                this.$props.onFormChange?.({
                  ...this.$props.form,
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
      let lang = (this as any).languages;
      if (groupId) {
        lang = groupId.split(".").reduce((obj, g) => {
          return obj?.[g];
        }, lang);
      }

      return lang?.[this.$props.locale]?.message[key];
    },
    setMessage({
      id,
      locale,
      key,
      value,
      type = "formItem",
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
    updateWidget(widget: WidgetItem) {
      this.$data.widgetItems[widget.id] = widget;
      this.$emit("onPageChange", {
        ...this.$props.form,
        widgets: Object.values(this.$data.widgetItems).map((m) => m.widget),
      });
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
      getFormState: () => this.$props.state,
      setFormState: (newFormState: FormState) => {
        this.$emit("onStateChange", newFormState);
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
}
.widgets-layout-inner-wrapper {
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
