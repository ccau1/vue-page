<template>
  <div v-if="!getWidgetState('reflexiveHide')">
    <div class="question-wrapper">
      <label>{{ t("__label", widget.id) }}</label>
      <div>
        <component
          :is="questionControls[widget.data.control].display"
          :data="widget.data.controlData"
          :widget="widget"
          :onChange="onChange"
          :value="getWidgetState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
          :t="t"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import {
  handleReflexivesByWidgetIds,
  registerReflexives,
  unregisterReflexives,
} from "../../reflexiveUtils";

export default defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    formWidgets: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
  },
  inject: [
    "t",
    "questionControls",
    "widgetControls",
    "getFormState",
    "setFormState",
  ],
  created() {
    registerReflexives({
      widget: this.$props.widget,
      formState: this.getFormState(),
      setFormState: this.setFormState,
    });
  },
  unmounted() {
    unregisterReflexives({
      formState: this.formState,
      widget: this.$props.widget,
      setFormState: this.setFormState,
    });
  },
  computed: {
    formState() {
      return this.getFormState();
    },
  },
  methods: {
    onChange(response) {
      this.setWidgetState("response", response);

      handleReflexivesByWidgetIds(
        this.formState.widgetState.__qReflexiveWatch?.[this.$props.widget.code],
        {
          formWidgets: this.$props.formWidgets,
          formState: this.formState,
          setFormState: this.setFormState,
        }
      );
    },
  },
});
</script>

<style scoped>
.question-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
}
.question-wrapper > label {
  flex: 1;
  max-width: 300px;
  border-right: 1px solid #393939;
  padding: 10px 0;
}
.question-wrapper > div {
  flex: 2;
  padding: 10px 20px;
}
</style>
