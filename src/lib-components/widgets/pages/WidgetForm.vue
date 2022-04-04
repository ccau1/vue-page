<template>
  <div>
    <div class="paging-menu">
      <a
        class="paging-menu-item"
        :class="{ active: currentPageIndex === pageIndex }"
        v-for="(page, pageIndex) in widget.data.pages"
        :key="pageIndex"
        v-on:click="() => setState('currentPageIndex', pageIndex)"
      >
        {{ t(page.labelKey, widget.id) }}
      </a>
    </div>
    <div
      class="paging-content-item"
      v-for="(page, pageIndex) in widget.data.pages"
      :key="pageIndex"
    >
      <div v-if="currentPageIndex === pageIndex">
        <div v-for="(child, childIndex) in page.children" :key="childIndex">
          <widgets-layout
            :widgets="widgets"
            :widgetItems="widgetItems"
            :excludeWidgetIds="[widget.id]"
            :forParent="widget.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import WidgetsLayout from "../../WidgetsLayout.vue";

export default defineComponent({
  components: { WidgetsLayout },
  props: {
    widget: Object,
    widgets: Object,
    widgetItems: Object,
    formState: Object,
  },
  inject: ["t", "setFormState"],
  computed: {
    currentPageIndex() {
      return (
        this.formState.widgetState?.[this.$props.widget.id]?.currentPageIndex ||
        0
      );
    },
  },
  watch: {
    formStateCurrentPageIndex: {
      handler(newPageIndex) {
        this.$data.currentPageIndex = newPageIndex;
      },
      deep: true,
    },
  },
  methods: {
    setState(key, value) {
      const formState = this.formState;
      if (value === undefined) {
        if (!formState.widgetState[this.$props.widget.id]) return;
        delete formState.widgetState[this.$props.widget.id][key];
      } else {
        if (!formState.widgetState[this.$props.widget.id])
          formState.widgetState[this.$props.widget.id] = {};
        formState.widgetState[this.$props.widget.id][key] = value;
      }
      this.setFormState(formState);
    },
  },
});
</script>

<style scoped>
.paging-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.paging-menu-item {
  display: inline-block;
  padding: 5px 10px;
}

.paging-menu-item.active {
  background-color: #e8e8e8;
}

/* .paging-content-item {
} */
</style>
