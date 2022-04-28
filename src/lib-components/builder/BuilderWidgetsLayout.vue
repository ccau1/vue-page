<template>
  <div>
    <div
      class="widget-container"
      :class="{
        hovering: hoveredWidgetId === widget.id,
        dragging: formState.interactiveState.draggingWidgetId === widget.id,
        notDragging:
          formState.interactiveState.draggingWidgetId &&
          formState.interactiveState.draggingWidgetId !== widget.id,
      }"
      v-for="(widget, widgetIndex) in filteredWidgetItemsArr"
      :key="widget.id"
      @mouseenter.stop="(ev) => onMouseEnter(ev, widget.id)"
      @mouseleave.stop="(ev) => onMouseLeave(ev, widget.id)"
    >
      <div class="add-line">
        <div
          class="line"
          @click.stop="(ev) => onAddClick(ev, widget, widgetIndex)"
        />
        <a
          class="add-button"
          @click.stop="(ev) => onAddClick(ev, widget, widgetIndex)"
          >+</a
        >
      </div>
      <div class="left-actions-wrapper">
        <a
          class="dnd-placeholder"
          @mousedown="(ev) => onDnDPlaceholderMouseDown(ev, widget.id)"
          @mouseup="(ev) => onDnDPlaceholderMouseUp(ev, widget.id)"
        >
          &uarr;&darr;
        </a>
        <a class="delete-button" @click="() => removeWidget(widget.id)"
          >&#128465;</a
        >
      </div>

      <widget-view
        :widget="widget"
        :widgetControls="widgetControls"
        :widgetItems="widgetItems"
        :formState="formState"
        :setWidgetState="setWidgetState"
        :getWidgetState="getWidgetState"
        :view="view"
      />
      <div
        class="add-line"
        v-if="widgetIndex === filteredWidgetItemsArr.length - 1"
      >
        <div
          class="line"
          @click.stop="(ev) => onAddClick(ev, widget, widgetIndex)"
        />
        <a
          class="add-button"
          @click.stop="(ev) => onAddClick(ev, widget, widgetIndex)"
          >+</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { arrayOf } from "vue-types";
import WidgetItem from "../models/WidgetItem";
import WidgetView from "./BuilderWidgetView.vue";

export default defineComponent({
  components: { WidgetView },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: arrayOf(String),
    onlyIncludeWidgetIds: arrayOf(String),
    forParent: String,
  },
  inject: [
    "widgetControls",
    "getFormState",
    "getView",
    "setFormState",
    "removeWidget",
  ],
  data() {
    return { hoveredWidgetId: -1 };
  },
  computed: {
    view() {
      return this.getView();
    },
    formState() {
      return this.getFormState();
    },
    widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },
    filteredWidgetItemsArr() {
      const filteredArr = this.widgetItemsArr
        .filter((f) => {
          return (
            ((!this.forParent && !f.parentId) ||
              f.parentId === this.forParent) &&
            (!this.$props.onlyIncludeWidgetIds ||
              this.$props.onlyIncludeWidgetIds.includes(f.id)) &&
            (!(this.excludeWidgetIds || []).length ||
              !this.excludeWidgetIds.includes(f.id))
          );
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return filteredArr;
    },
  },
  methods: {
    removeWidget(widget) {},
    onDnDPlaceholderMouseDown(ev, widgetId) {
      this.formState.interactiveState.draggingWidgetId = widgetId;
      this.setFormState(this.formState);
    },
    onDnDPlaceholderMouseUp(ev, widgetId) {
      this.formState.interactiveState.draggingWidgetId = "";
      this.setFormState(this.formState);
    },
    onMouseEnter(ev, widgetId) {
      ev.stopPropagation();
      this.$data.hoveredWidgetId = widgetId;
      this.formState.interactiveState.hoveredWidgetId = widgetId;
      this.setFormState(this.formState);
    },
    onMouseLeave(ev, widgetId) {
      if (this.$data.hoveredWidgetId !== widgetId) return;
      this.$data.hoveredWidgetId = -1;
      this.formState.interactiveState.hoveredWidgetId = "";
      this.setFormState(this.formState);
    },
    setWidgetState(key, value, widget) {
      const formState = this.formState;
      if (value === undefined) {
        if (!formState.widgetState[widget.id]) return;
        delete formState.widgetState[widget.id][key];
      } else {
        if (!formState.widgetState[widget.id])
          formState.widgetState[widget.id] = {};
        formState.widgetState[widget.id][key] = value;
      }
      this.setFormState(formState);
    },
    getWidgetState(key, widget) {
      return this.formState.widgetState[widget.id]?.[key];
    },
  },
});
</script>

<style scoped>
.widget-container {
  position: relative;
}
.widget-container.notDragging {
  opacity: 0.4;
}
.widget-container.dragging {
  opacity: 1;
}
.widget-form-control {
  position: absolute;
  top: -40px;
  left: 0;
}

.add-line {
  position: relative;
  padding: 10px 0;
  margin: -10.5px 0px;
  opacity: 0;
  transition: opacity 200ms;
  z-index: 10;
}
.add-line:hover {
  opacity: 1;
}
.add-line .line {
  width: 100%;
  height: 1px;
  background-color: #b5b5b5;
  cursor: pointer;
}
.add-line .add-button {
  position: absolute;
  top: -2px;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  box-shadow: 0px 0px 10px 10px #fff;
  cursor: pointer;
}
.add-line .add-button:hover {
  background-color: #eaeaea;
}

.widget-container .dnd-placeholder {
  width: 20px;
  height: 25px;
  padding-bottom: 2px;
  background-color: #fafafa;
  border: 1px dashed #dadada;
  cursor: grab;
  font-size: 9pt;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.widget-container .dnd-placeholder:hover {
  background-color: #eaeaea;
}
.left-actions-wrapper {
  position: absolute;
  top: 15px;
  left: -40px;
  padding: 10px;
  opacity: 0;
  transition: opacity 200ms;
  width: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.widget-container.hovering > .left-actions-wrapper {
  opacity: 1;
}
.delete-button {
  font-size: 12px;
  margin: 2px 0;
  padding: 1px 0;
  cursor: pointer;
  color: red;
}
</style>
