<template>
  <div v-if="!getWidgetState('reflexiveHide')">
    <div class="question-wrapper">
      <label>{{ t("__label", widget.id) }}</label>
      <div>
        <component
          :is="questionControls[widget.properties.control].readOnly"
          :properties="widget.properties.controlProperties"
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
  created() {},
  unmounted() {},
  computed: {
    formState() {
      return this.getFormState();
    },
  },
  methods: {
    onChange(response) {
      this.setWidgetState("response", response);
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
