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
import { widgets as sysWidgets } from "./widgets";
import { widgetEffects as sysWidgetEffectControls } from "./widgetEffectControls";
import { questionControls as sysQuestionControls } from "./questionControls";
import { shape, arrayOf, string, bool, instanceOf } from "vue-types";
import { Form, Widget } from ".";
import { FormState } from "./models/FormState";
import WidgetsLayout from "./WidgetsLayout.vue";
import WidgetItem from "./models/WidgetItem";
import { WidgetItems } from "@/entry.esm";
import { cachedMerge } from "./utils";

interface VuePageProps {
  languages: { [widgetId: string]: { [key: string]: string } };
  form: Form;
  onFormChange: (newForm: Form) => void;
  state: FormState;
  onStateChange: (newState: FormState) => void;
  widgets?: WidgetItems;
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
  // components: { DynamicFormLayout },
  props: {
    languages: Object,
    form: Object as () => Form,
    // eslint-disable-next-line no-unused-vars
    onFormChange: Function, // func<(form: Form) => void>().isRequired,
    state: instanceOf(FormState).isRequired,
    // eslint-disable-next-line no-unused-vars
    onStateChange: Function, // func<(state: FormState) => void>().isRequired,
    widgets: Object, // shape(QuestionControl),
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
        this.$props.widgets
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
      return lang?.[key];
    },
  },
  provide() {
    return {
      getView: () => this.$props.view,
      t: (this as any).t,
      languages: this.$props.languages,
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
</style>
