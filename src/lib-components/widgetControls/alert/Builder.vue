<template>
  <div
    class="alert"
    v-if="isOpen"
    :style="alertStyles"
    :class="{ [widget.properties.type]: true }"
  >
    <h3 class="title">
      <textarea
        ref="titleInput"
        :value="t('__title', widget.id)"
        @input="(ev) => updateText('title', ev.target.value)"
        class="text-input"
        @load="
          () => {
            this.style.height = '';
            this.style.height = this.scrollHeight + 'px';
          }
        "
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      />
    </h3>
    <p>
      <textarea
        ref="textInput"
        :value="t('__text', widget.id)"
        @input="(ev) => updateText('text', ev.target.value)"
        class="text-input"
        @load="
          () => {
            this.style.height = '';
            this.style.height = this.scrollHeight + 'px';
          }
        "
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      />
    </p>
    <a
      class="close-button"
      @click="onCloseAlert"
      v-if="widget.properties.showCloseBtn"
      >x</a
    >
  </div>
</template>

<script lang="ts">
import { Widget } from "@/entry.esm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
    properties: Object,
  },
  inject: ["t", "getLocale", "setMessage"],
  mounted() {
    this.$nextTick(() => {
      (this.$refs.titleInput as HTMLTextAreaElement).style.height = "";

      (this.$refs.titleInput as HTMLTextAreaElement).style.height =
        (this.$refs.titleInput as HTMLTextAreaElement).scrollHeight + "px";

      (this.$refs.textInput as HTMLTextAreaElement).style.height = "";

      (this.$refs.textInput as HTMLTextAreaElement).style.height =
        (this.$refs.textInput as HTMLTextAreaElement).scrollHeight + "px";
    });
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    onCloseAlert() {
      this.$data.isOpen = false;
      setTimeout(() => (this.$data.isOpen = true), 1000);
    },
    updateText(name: string, text: string) {
      (this as any).setMessage({
        id: (this.$props.widget as Widget).id,
        locale: (this as any).getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, ""),
      });
    },
  },
  computed: {
    alertStyles(): { [cssProp: string]: number | string } {
      if (
        this.widget?.properties.type !== "custom" ||
        this.widget?.properties.customColor
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
  padding: 18px 18px;
  margin: 10px 0;
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
.alert .title {
  margin: 0 0 10px 0;
  font-weight: bold;
}

.alert > .close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 18px 18px;
  cursor: pointer;
  transform: scaleX(1.2);
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
