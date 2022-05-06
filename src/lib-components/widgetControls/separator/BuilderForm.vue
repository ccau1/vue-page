<template>
  <div>
    <div class="fieldItem">
      <label class="label">Label Position</label>
      <div class="button-group">
        <button
          class="button-item"
          :class="{ active: widget.properties.labelPosition === 'start' }"
          @click="() => setLabelPosition('start')"
        >
          start
        </button>
        <button
          class="button-item"
          :class="{ active: widget.properties.labelPosition === 'center' }"
          @click="() => setLabelPosition('center')"
        >
          center
        </button>
        <button
          class="button-item"
          :class="{ active: widget.properties.labelPosition === 'end' }"
          @click="() => setLabelPosition('end')"
        >
          end
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetItem } from "@/lib-components/models/WidgetItem";
import { defineComponent } from "@vue/composition-api";
import { SeparatorProperties } from ".";

export default defineComponent({
  props: {
    widget: {
      type: WidgetItem,
      required: true,
    },
  },
  inject: ["updateWidget"],
  methods: {
    setLabelPosition(labelPosition: "start" | "center" | "end") {
      (this.$props.widget.properties as SeparatorProperties).labelPosition =
        labelPosition;
      (this as any).updateWidget(this.$props.widget);
    },
  },
});
</script>

<style scoped>
.fieldItem {
  padding: 10px;
}
.fieldItem > .label {
  display: block;
  padding: 10px 0;
}
.button-group {
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
}
.button-item {
  padding: 5px 10px;
  border: none;
  flex: 1;
  cursor: pointer;
}
.button-item.active {
  background-color: #03a9f4;
  color: #fff;
}
</style>
