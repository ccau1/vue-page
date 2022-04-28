<template>
  <section class="section-wrapper" :class="{ errors: hasChildErrors }">
    <label>
      <input
        type="text"
        class="text-input"
        :value="label"
        @input="(ev) => updateText('label', ev.target.value)"
      />
    </label>
    <builder-widgets-layout
      :widgetControls="widgetControls"
      :widgetItems="widgetItems"
      :forParent="widget.id"
    />
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetItem from "../../models/WidgetItem";
import WidgetsLayout from "../../WidgetsLayout.vue";
import BuilderWidgetsLayout from "../../builder/BuilderWidgetsLayout.vue";

export default defineComponent({
  components: { BuilderWidgetsLayout, WidgetsLayout },
  props: {
    widget: WidgetItem,
    widgetItems: Object,
    widgetControls: Object,
  },
  inject: ["t", "getLocale", "setMessage"],
  setup() {},
  computed: {
    label() {
      return this.t("__label", this.$props.widget.id);
    },
    childErrors() {
      return this.$props.widget.getState()?.childErrors;
    },
    hasChildErrors() {
      return this.$props.widget.hasChildErrors();
    },
  },
  methods: {
    updateText(name, text) {
      this.setMessage({
        id: this.$props.widget.id,
        locale: this.getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, ""),
      });
    },
    isShowLabel(pos) {
      return (
        this.$props.widget.properties.hasLabel &&
        this.$props.widget.properties.labelPosition === pos
      );
    },
  },
});
</script>

<style scoped>
.section-wrapper {
  position: relative;
  border: 1px solid #a9a9a9;
  min-height: 30px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}
.section-wrapper > label {
  position: absolute;
  top: 0px;
  left: 10px;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 1px 10px;
  z-index: 10;
}
.section-wrapper.errors {
  border-color: #f00;
}

.text-input {
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  resize: none;
  min-height: 10px;
  margin-bottom: -15px;
}
</style>
