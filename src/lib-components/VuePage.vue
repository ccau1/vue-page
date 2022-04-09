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
import {
  default as sysQuestionControls,
  FormControl,
} from "./questionControls";
import { widgets as sysWidgets } from "./widgets";
// import DynamicFormLayout from "./DynamicFormLayout.vue";
import { shape, arrayOf, string, bool, instanceOf } from "vue-types";
import { Form, Widget } from ".";
import { FormState } from "./models/FormState";
import WidgetsLayout from "./WidgetsLayout.vue";
import WidgetItem from "./models/WidgetItem";
import { WidgetControl, WidgetItems } from "@/entry.esm";

interface VuePageProps {
  languages: { [widgetId: string]: { [key: string]: string } };
  form: Form;
  onFormChange: (newForm: Form) => void;
  state: FormState;
  onStateChange: (newState: FormState) => void;
  widgets?: WidgetItems;
  questionControls?: FormControl;
  view?: "display" | "readOnly";
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
  };
}

interface VuePageData {
  combWidgetControls: { [key: string]: WidgetControl<any> };
  combQuestionControls: { [key: string]: FormControl };
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
    widgets: Object, // shape(FormControl),
    questionControls: arrayOf(FormControl),
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
      combQuestionControls: sysQuestionControls,
      combWidgetControls: sysWidgets,
      widgetItems: {},
    } as {
      combQuestionControls: { [key: string]: FormControl };
      combWidgetControls: { [key: string]: WidgetControl };
      widgetItems: WidgetItems;
    };
  },
  computed: {
    widgetItemsArr() {
      return this.$props.form.widgets;
    },
    widgetsHandlerWatch() {
      return {
        widgets: this.$props.widgets,
        configs: this.$props.configs?.widgets,
      };
    },
    questionControlsHandlerWatch() {
      return {
        questionControls: this.$props.questionControls,
        configs: this.$props.configs?.questionControls,
      };
    },
    formState() {
      return this.$props.state;
    },
  },
  watch: {
    widgetsHandlerWatch: {
      handler({ widgets, configs }) {
        this.$data.combWidgetControls = {
          ...(configs?.widgets?.disableInternalControls ? {} : sysWidgets),
          ...(widgets || {}),
        };
      },
      immediate: true,
    },
    questionControlsHandlerWatch: {
      handler({ questionControls, configs }) {
        this.$data.combQuestionControls = {
          ...(configs?.questionControls?.disableInternalControls
            ? {}
            : sysQuestionControls),
          ...(questionControls || {}),
        } as { [key: string]: FormControl };
      },
      immediate: true,
    },
    "form.widgets": {
      handler(newFormWidgetArr) {
        this.$data.widgetItems = newFormWidgetArr.reduce(
          (obj: { [widgetId: string]: WidgetItem }, widget: Widget) => {
            const WidgetItemClass =
              this.$data.combWidgetControls[widget.type]?.widgetItem ||
              WidgetItem;
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
      widgetControls: this.$data.combWidgetControls,
      questionControls: this.$data.combQuestionControls,
    };
  },
});
</script>

<style scoped>
.main-wrapper {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
