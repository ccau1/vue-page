<template>
  <div
    class="line-wrapper"
    :class="{ vertical: widget.data.dir === 'vertical' }"
  >
    <label
      v-if="isShowLabel('start')"
      :class="{ [widget.data.labelPosition || 'start']: true }"
      >{{ label }}</label
    >
    <div class="line" />
    <label
      v-if="isShowLabel('center')"
      :class="{ [widget.data.labelPosition || 'start']: true }"
      >{{ label }}</label
    >
    <div class="line" />
    <label
      v-if="isShowLabel('end')"
      :class="{ [widget.data.labelPosition || 'start']: true }"
      >{{ label }}</label
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
.line-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}
.line-wrapper.vertical {
  flex-direction: column;
}

.line-wrapper .line {
  flex: 1;
  background-color: #a0a0a0;
  height: 1px;
}
.line-wrapper.vertical .line {
  width: 1px;
}
.line-wrapper label {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}
.line-wrapper label.start {
  padding-left: 0;
}
.line-wrapper label.end {
  padding-right: 0;
}
</style>
