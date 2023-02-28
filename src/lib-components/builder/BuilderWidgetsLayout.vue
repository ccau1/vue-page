<template>
  <div>
    <div
      v-for="(widget, widgetIndex) in filteredWidgetItemsArr"
      :key="widget.id"
      class="widget-container"
      :class="{
        hovering: hoveredWidgetId === widget.id,
        dragging: pageState.interactiveState.draggingWidgetId === widget.id,
        notDragging:
          pageState.interactiveState.draggingWidgetId &&
          pageState.interactiveState.draggingWidgetId !== widget.id,
      }"
      @mouseenter.stop="(ev) => onMouseEnter(ev, widget.id)"
      @mouseleave.stop="(ev) => onMouseLeave(ev, widget.id)"
    >
      <div class="left-actions-wrapper">
        <a
          class="dnd-placeholder"
          @mousedown="(ev) => onDnDPlaceholderMouseDown(ev, widget.id)"
          @mouseup="(ev) => onDnDPlaceholderMouseUp(ev, widget.id)"
        >
          &uarr;&darr;
        </a>
        <a class="delete-button"
@click="() => widget.removeWidget()">
          &#128465;
        </a>
      </div>
      <div
        class="add-line"
        :class="{ opened: openedAddOptionsIndex === widgetIndex }"
      >
        <div
          class="line"
          @click.stop="(ev) => toggleShowAddOptions(ev, widget, widgetIndex)"
        />
        <a
          class="add-button"
          @click.stop="(ev) => toggleShowAddOptions(ev, widget, widgetIndex)"
        >
          <span>+</span>
        </a>
        <div
          class="add-options-wrapper"
          :class="{ open: openedAddOptionsIndex === widgetIndex }"
        >
          <div class="add-options-inner-wrapper">
            <a
              v-for="widgetControlKey in Object.keys(widgetControls)"
              :key="widgetControlKey"
              @click="
                (ev) => addWidget(ev, widgetControlKey, widget, widgetIndex)
              "
            >
              {{ widgetControlKey }}
            </a>
          </div>
        </div>
      </div>
      <builder-widget-view
        :widget="widget"
        :widget-controls="widgetControls"
        :widget-items="widgetItems"
        :page-state="pageState"
        :set-widget-state="setWidgetState"
        :get-widget-state="getWidgetState"
        :view="view"
      />
      <div
        v-if="widgetIndex === filteredWidgetItemsArr.length - 1"
        class="add-line"
        :class="{ opened: openedAddOptionsIndex === widgetIndex + 1 }"
      >
        <div
          class="line"
          @click.stop="
            (ev) => toggleShowAddOptions(ev, widget, widgetIndex + 1)
          "
        />
        <a
          class="add-button"
          @click.stop="
            (ev) => toggleShowAddOptions(ev, widget, widgetIndex + 1)
          "
        >
          <span>+</span>
        </a>
        <div
          class="add-options-wrapper"
          :class="{ open: openedAddOptionsIndex === widgetIndex + 1 }"
        >
          <div class="add-options-inner-wrapper">
            <a
              v-for="widgetControlKey in Object.keys(widgetControls)"
              :key="widgetControlKey"
              @click="
                (ev) => addWidget(ev, widgetControlKey, widget, widgetIndex + 1)
              "
            >
              {{ widgetControlKey }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { arrayOf } from 'vue-types';
import { WidgetItem } from '../models/WidgetItem';
import BuilderWidgetView from './BuilderWidgetView.vue';

export default defineComponent({
  components: { BuilderWidgetView },
  props: {
    widgetControls: Object,
    widgetItems: Object,
    excludeWidgetIds: arrayOf(String),
    onlyIncludeWidgetIds: arrayOf(String),
    forParent: String,
  },
  inject: [
    'widgetControls',
    'getPageState',
    'getView',
    'setPageState',
    'removeWidget',
  ],
  data() {
    return { hoveredWidgetId: -1, openedAddOptionsIndex: -1 };
  },
  computed: {
    view() {
      return this.getView();
    },
    pageState() {
      return this.getPageState();
    },
    widgetItemsArr() {
      return Object.values(this.$props.widgetItems);
    },
    filteredWidgetItemsArr() {
      return this.widgetItemsArr
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
    },
  },
  methods: {
    toggleShowAddOptions(ev, widget, widgetIndex) {
      this.$data.openedAddOptionsIndex =
        this.$data.openedAddOptionsIndex === widgetIndex ? -1 : widgetIndex;
    },
    addWidget(ev, widgetControlKey, widget, widgetIndex) {
      const newWidget = this.widgetControls[widgetControlKey].create();
      this.$data.openedAddOptionsIndex = -1;
    },
    onDnDPlaceholderMouseDown(ev, widgetId) {
      this.pageState.interactiveState.draggingWidgetId = widgetId;
      this.setPageState(this.pageState);
    },
    onDnDPlaceholderMouseUp(ev, widgetId) {
      this.pageState.interactiveState.draggingWidgetId = '';
      this.setPageState(this.pageState);
    },
    onMouseEnter(ev, widgetId) {
      ev.stopPropagation();
      this.$data.hoveredWidgetId = widgetId;
      this.pageState.interactiveState.hoveredWidgetId = widgetId;
      this.setPageState(this.pageState);
    },
    onMouseLeave(ev, widgetId) {
      if (this.$data.hoveredWidgetId !== widgetId) return;
      this.$data.hoveredWidgetId = -1;
      this.pageState.interactiveState.hoveredWidgetId = '';
      this.setPageState(this.pageState);
    },
    setWidgetState(key, value, widget) {
      const pageState = this.pageState;
      if (value === undefined) {
        if (!pageState.widgetState[widget.id]) return;
        delete pageState.widgetState[widget.id][key];
      } else {
        if (!pageState.widgetState[widget.id])
          pageState.widgetState[widget.id] = {};
        pageState.widgetState[widget.id][key] = value;
      }
      this.setPageState(pageState);
    },
    getWidgetState(key, widget) {
      return this.pageState.widgetState[widget.id]?.[key];
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
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  box-shadow: 0px 0px 10px 10px #fff;
  cursor: pointer;
  transition: background-color 300ms;
}
.add-line.opened .add-button {
  background-color: #f71414;
  border: 1px solid #f71414;
  color: #fff;
}
.add-line.opened .add-button:hover {
  background-color: #dc1212;
  border: 1px solid #dc1212;
}

.add-line .add-button span {
  transition: all 300ms;
}
.add-line.opened .add-button span {
  transform: rotate(45deg);
}
.add-line .add-button:hover {
  background-color: #eaeaea;
}
.add-line .add-options-wrapper {
  margin-left: 15px;
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  display: none;
}
.add-line .add-options-wrapper.open {
  display: block;
}
.add-line .add-options-inner-wrapper {
  width: 100%;
  padding-bottom: 10px;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
}
.add-line .add-options-wrapper a {
  padding: 2px 4px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
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
