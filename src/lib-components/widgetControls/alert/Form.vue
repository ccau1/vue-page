<template>
  <div
    class="alert"
    v-if="isOpen"
    :style="alertStyles"
    :class="{ [widget.properties.type]: true }"
  >
    <h3>{{ t("__title", widget.id) }}</h3>
    <p>{{ t("__text", widget.id) }}</p>
    <a
      class="close-button"
      @click="onCloseAlert"
      v-if="widget.properties.showCloseBtn"
      >x</a
    >
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
  },
  inject: ["t"],
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
    },
  },
  computed: {
    alertStyles() {
      if (
        this.widget.properties.type !== "custom" ||
        this.widget.properties.customColor
      )
        return {};
      return {
        backgroundColor: this.widget.properties.customBackgroundColor,
        borderColor: this.widget.properties.customBorderColor || "transparent",
        ...(this.widget.properties.customTextColor
          ? { color: this.widget.properties.customTextColor }
          : {}),
      };
    },
  },
});
</script>

<style scoped>
.alert {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f4f6f8;
  border: 1px solid #e5e9ed;
  position: relative;
}
.alert.success {
  background-color: #ebf7ee;
  border-color: #e2f1e7;
}
.alert.info {
  background-color: #e6f0f8;
  border-color: #cad9e7;
}
.alert.danger {
  background-color: #fdede9;
  border-color: #f2e1dd;
}
.alert.warning {
  background-color: #fef8ea;
  border-color: #f4eada;
}

.alert > .close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 15px;
  cursor: pointer;
  transform: scaleX(1.2);
}
</style>
