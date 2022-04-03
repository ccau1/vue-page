<template>
  <div v-if="!widget.getState('reflexiveHide')">
    <div class="question-wrapper">
      <label>{{ t("__label", widget.id) }}</label>
      <div>
        <component
          :is="questionControls[widget.data.control].display"
          :data="widget.data.controlData"
          :widget="widget"
          :onChange="onChange"
          :value="widget.getState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
          :t="t"
        />
        <span
          class="error"
          v-for="errorKey in getWidgetState('errors')"
          :key="errorKey"
          >{{ t(errorKey, widget.id) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
// import { getParents } from "../../utils";
// import { validateWidget } from "../../validateUtils";

export default defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    widgetItems: Object,
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
    const widgetState = { ...this.$props.widget.getState() };
    this.widget.setState("type", "question");
    if (widgetState?.touched === undefined) {
      this.widget.setState("touched", false);
      this.widget.setState("pristine", true);
      this.widget.setState("dirty", false);
    }
  },
  unmounted() {},
  computed: {
    formState() {
      return this.getFormState();
    },
  },
  methods: {
    onChange(response, ignoreChecks) {
      this.widget.setState("response", response);
      if (ignoreChecks) return;

      this.widget.setState("touched", true);
      this.widget.setState("pristine", false);
      this.widget.setState("dirty", true);

      (async () => {
        const errors = await this.$props.widget.runValidations();
        this.widget.setState("valid", !errors);
        this.widget.setState("hasErrors", !!errors);
        const widgetIdsToHandleReflexives =
          this.formState.getReflexWidgetIdsByCode(this.$props.widget.code);
        await Promise.all(
          widgetIdsToHandleReflexives.map(async (widgetId) => {
            return this.$props.widgetItems[widgetId].runReflexives();
          })
        );
        const parentIds = this.$props.widget.getParentIds();
        (parentIds || []).forEach((parentId) => {
          const parentState = this.$props.widgetItems[parentId].getState();
          const childErrorsState = parentState?.childErrors || {};
          if (!errors && !childErrorsState[this.$props.widget.id]) return;
          if (!errors) {
            delete childErrorsState[this.$props.widget.id];
          } else {
            childErrorsState[this.$props.widget.id] = errors;
          }
          // FIXME: if this widget is reflexive, need
          // to handle parent's childErrors if not shown
          console.log(
            "this.$props.widgetItems",
            this.$props.widgetItems[parentId]
          );
          this.$props.widgetItems[parentId].setChildErrors(
            this.$props.widget.id,
            errors
          );
        });
      })();
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

.error {
  display: block;
  color: red;
}
</style>
