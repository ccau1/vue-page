<template>
  <div v-if="!widget.getState('reflexiveHide')">
    <div class="question-wrapper">
      <label
        :for="widget.code || widget.id"
        v-if="!widget.properties.hideLabel"
        :class="{ errors: (getWidgetState('errors') || []).length }"
        >{{ t("__label", widget.id) }}</label
      >
      <div>
        <component
          :is="questionControls[widget.properties.control].display"
          :properties="widget.properties.controlProperties"
          :widget="widget"
          :onChange="onChange"
          :value="widget.getState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
          :errors="getWidgetState('errors')"
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
        // handle validations
        await this.$props.widget.runValidations();
        // handle reflexives
        const widgetIdsToHandleReflexives =
          this.formState.getReflexWidgetIdsByCode(this.$props.widget.code);
        await Promise.all(
          widgetIdsToHandleReflexives.map(async (widgetId) => {
            return this.$props.widgetItems[widgetId].runReflexives();
          })
        );
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
}
.question-wrapper > label {
  flex: 1;
  max-width: 300px;
  border-right: 1px solid #393939;
  padding: 20px 0;
  margin-right: 20px;
}
.question-wrapper > label.errors {
  color: #f00;
}

.question-wrapper > div {
  flex: 2;
  padding: 20px 0px;
}

.error {
  display: block;
  color: red;
  margin-top: 10px;
}
</style>
