<template>
  <div>
    <div class="section">
      <label>Pages</label>
      <div class="pages-list-wrapper">
        <div
          v-for="(page, pageIndex) in widget.properties.pages"
          :key="pageIndex"
          class="page-item"
        >
          <input
            type="text"
            :value="t(page.labelKey, widget.id)"
            @change="(ev) => setPageLabel(pageIndex, ev.target.value)"
          />
          <a class="delete-page-button" @click="() => widget.removeWidget()"
            >&#128465;</a
          >
        </div>
      </div>
    </div>

    <div class="section">
      <label>Options</label>
      <label>
        <input
          type="checkbox"
          @change="(ev) => setProperty('hasCompleteButton', ev.target.checked)"
          :checked="widget.properties.hasCompleteButton"
        />
        has complete button
      </label>
      <label>
        <input
          type="checkbox"
          @change="(ev) => setProperty('tabsVisible', ev.target.checked)"
          :checked="widget.properties.tabsVisible"
        />
        show tabs
      </label>
      <label>
        <input
          type="checkbox"
          @change="(ev) => setProperty('navigationVisible', ev.target.checked)"
          :checked="widget.properties.navigationVisible"
        />
        show navigation
      </label>
      <label>
        <input
          type="checkbox"
          @change="
            (ev) =>
              setProperty('navigationIntegrateChildrenPages', ev.target.checked)
          "
          :checked="widget.properties.navigationIntegrateChildrenPages"
        />
        integrate children pages
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import PagesWidgetItem from "./PagesWidgetItem";

export default defineComponent({
  props: {
    widget: Object,
  },
  inject: ["updateWidget", "t", "setMessage", "getLocale"],
  methods: {
    setPageLabel(pageIndex: number, label: string) {
      (this as any).setMessage({
        id: (this.$props.widget as PagesWidgetItem).id,
        locale: (this as any).getLocale(),
        key: (this.$props.widget as PagesWidgetItem).properties.pages[pageIndex]
          .labelKey,
        value: label,
      });
    },
    setProperty(field: string, value: boolean) {
      console.log("setProp", field, value);

      (this.widget as PagesWidgetItem).setProperty(field, value);
    },
  },
});
</script>

<style scoped>
.section {
  padding: 15px 5px;
}
label {
  display: block;
  padding: 5px 0;
}
.page-item {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.page-item input {
  flex: 1;
  border-width: 0 0 1px 0;
  outline: none;
}
.page-item .delete-page-button {
  padding-right: 5px;
  padding-left: 5px;
}
</style>
