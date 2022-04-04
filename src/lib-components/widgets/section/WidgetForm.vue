<template>
  <section class="section-wrapper">
    <label v-if="!!label">{{ label }}</label>
    <widgets-layout
      :widgetControls="widgetControls"
      :widgetItems="widgetItems"
      :forParent="widget.id"
    />
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetsLayout from "../../WidgetsLayout.vue";

export default defineComponent({
  components: { WidgetsLayout },
  props: {
    widget: Object,
    widgetItems: Object,
    widgetControls: Object,
  },
  inject: ["t"],
  setup() {},
  computed: {
    label() {
      return this.t("__label", this.$props.widget.id);
    },
  },
  methods: {
    isShowLabel(pos) {
      return (
        this.$props.widget.data.hasLabel &&
        this.$props.widget.data.labelPosition === pos
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
  margin: 10px;
  border-radius: 8px;
}
.section-wrapper > label {
  position: absolute;
  top: 0px;
  left: 10px;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 10px;
}
</style>
