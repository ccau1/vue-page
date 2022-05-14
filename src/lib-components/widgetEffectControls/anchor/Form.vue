<template>
  <div>
    <div class="field-wrapper">
      <label for="id">ID</label>
      <input
        id="id"
        type="text"
        :value="properties.id"
        @change="(ev) => onChange('id', ev.target.value)"
      />
    </div>
    <div class="field-wrapper">
      <label for="top">Position from top (px)</label>
      <input
        id="top"
        type="number"
        :value="properties.top"
        @change="(ev) => onChange('top', parseFloat(ev.target.value))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    effect: Object,
    properties: Object,
    widgetItem: Object,
  },
  methods: {
    onChange(key: string, value: string | number) {
      this.$emit("onPropertiesChange", {
        ...this.$props.properties,
        [key]: value,
      });
    },
  },
});
</script>

<style scoped>
.field-wrapper {
  padding: 5px 0 15px 0;
}
.field-wrapper.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.field-wrapper > label {
  display: block;
  margin-bottom: 3px;
  font-size: 9pt;
}
.field-wrapper.row > label {
  margin-right: 5px;
}
.field-wrapper select {
  padding: 5px;
  border-width: 0 0 1px 0;
}
.field-wrapper input {
  padding: 5px;
  border-width: 0 0 1px 0;
}
.field-row {
  display: flex;
  flex-direction: row;
}
</style>
