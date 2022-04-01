<template>
  <div>
    <widgets-display
      :widgetControls="combWidgetControls"
      :formWidgets="form.widgets"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  default as sysQuestionControls,
  FormControl,
} from "./questionControls";
import { widgets as sysWidgets } from "./widgets";
// import DynamicFormLayout from "./DynamicFormLayout.vue";
import { shape, arrayOf, string, bool, instanceOf } from "vue-types";
import { Form } from ".";
import { FormState } from "./models/FormState";
import WidgetsDisplay from "./WidgetsDisplay.vue";

@Component({
  components: { WidgetsDisplay },
  // components: { DynamicFormLayout },
  props: {
    languages: Object,
    form: Object as () => Form,
    // eslint-disable-next-line no-unused-vars
    onFormChange: Function, // func<(form: Form) => void>().isRequired,
    state: instanceOf(FormState).isRequired,
    // eslint-disable-next-line no-unused-vars
    onStateChange: Function, // func<(state: FormState) => void>().isRequired,
    widgets: shape({}), // shape(FormControl),
    questionControls: arrayOf(FormControl),
    // display | form | readOnly
    view: String,
    configs: shape({
      widgets: shape({
        // whether or not to use controls
        useInternalControls: bool(),
        blacklist: arrayOf(string()),
        whitelist: arrayOf(string()),
        filters: Object,
      }),
      questionControls: shape({
        // whether or not to use controls
        //
        useInternalControls: bool(),
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
    };
  },
  computed: {
    formWidgetsArr() {
      return Object.keys(this.$props.form.widgets).map((k) => ({
        ...this.$props.form.widgets[k],
        id: k,
      }));
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
    widgetsHandlerWatch() {
      this.$data.combWidgetControls = {
        ...(this.$props.configs.widgets.useInternalControls ? sysWidgets : {}),
        ...this.$props.widgets,
      };
    },
    questionControlsHandlerWatch() {
      this.$data.combQuestionControls = {
        ...(this.$props.configs.questionControls.useInternalControls
          ? sysQuestionControls
          : {}),
        ...this.$props.questionControls,
      };
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
      onFormStateChange: (newFormState: FormState) => {
        this.$emit("onStateChange", newFormState);
      },
      widgetControls: this.$data.combWidgetControls,
      questionControls: this.$data.combQuestionControls,
    };
  },
})
export default class DynamicForm extends Vue {}
</script>

<style scoped></style>
