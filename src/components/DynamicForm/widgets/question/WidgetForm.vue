<template>
  <div>
    <div class="question-wrapper">
      <label>{{ t("__label", widget.id) }}</label>
      <div>
        <component
          :is="questionControls[widget.data.control].form"
          :data="widget.data.controlData"
          :widget="widget"
          :onChange="onChange"
          :value="getWidgetState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
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
  inject: ["t", "questionControls"],
  setup() {},
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
  border-right: 1px solid #393939;
}
.question-wrapper > div {
  flex: 2;
  padding-left: 10px;
}
</style>
