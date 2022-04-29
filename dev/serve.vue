<template>
  <div>
    <div class="app-bar">
      <div class="app-bar-left-side">
        <div class="locale-switcher">
          <a
            :class="{ active: locale === 'en' }"
            v-on:click="() => setLocale('en')"
            >EN</a
          >
          <a
            :class="{ active: locale === 'zh_hk' }"
            v-on:click="() => setLocale('zh_hk')"
            >HK</a
          >
        </div>
        <label>
          <input
            type="checkbox"
            :checked="isPersistState"
            @change="togglePersistState"
          />
          Persist State</label
        >
      </div>
      <div class="app-bar-right-side">
        <div class="view-switcher">
          <a
            :class="{ active: pageView === 'display' }"
            v-on:click="() => setPageView('display')"
            >Customer Display</a
          >
          <a
            :class="{ active: pageView === 'builder' }"
            v-on:click="() => setPageView('builder')"
            >Builder</a
          >
          <a
            :class="{ active: pageView === 'readOnly' }"
            v-on:click="() => setPageView('readOnly')"
            >Read Only</a
          >
        </div>
      </div>
    </div>

    <vue-page-builder
      v-if="pageView === 'builder'"
      :page="page"
      :state="state"
      :languages="builderLanguages"
      :view="pageView"
      :locale="locale"
      @onStateChange="onStateChange"
      @onLanguageChange="onLanguageChange"
      @onPageChange="onPageChange"
    />
    <vue-page
      v-if="pageView !== 'builder'"
      :page="page"
      :state="state"
      :languages="languages"
      :view="pageView"
      @onStateChange="onStateChange"
      @event="onPageEvent"
    />
    <div style="display: flex; flex-direction: row; padding: 10px">
      <div style="flex: 1; padding: 10px">
        <h4>State</h4>
        <vue-json-pretty :path="'res'" :data="state" />
      </div>
      <div style="flex: 1; padding: 10px; background-color: #f8f8f8">
        <h4>Responses</h4>
        <vue-json-pretty :path="'res'" :data="responses" />
      </div>
      <div style="flex: 1; padding: 10px">
        <h4>Page</h4>
        <vue-json-pretty :path="'res'" :data="page" />
      </div>
      <div style="flex: 1; padding: 10px; background-color: #f8f8f8">
        <h4>Languages</h4>
        <vue-json-pretty :path="'res'" :data="languages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  VuePage,
  Page,
  WidgetLanguage,
  BuilderWidgetLanguages,
  WidgetItems,
} from "../src/lib-components";
import { PageState } from "../src/lib-components/models/PageState";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { Fragment } from "vue-fragment";

// mock data
import pageData from "./mockData/page1";
import _languages from "./mockData/page1_languages";
import WidgetItem from "@/lib-components/models/WidgetItem";

interface Response {
  code: string;
  response: any;
  valid: boolean;
}

export default defineComponent({
  components: {
    Fragment,
    VuePage,
    VueJsonPretty,
  },
  data() {
    const persistedStateRaw = localStorage.getItem("pageState");

    return {
      locale: "en",
      pageView: "display",
      isPersistState: !!persistedStateRaw,
      responses: [] as Response[],
      languagesRaw: _languages,
      ...pageData,
      state: !!persistedStateRaw
        ? PageState.from(JSON.parse(persistedStateRaw))
        : pageData.state,
    };
  },
  computed: {
    builderLanguages() {
      return (this.$data.languagesRaw as WidgetLanguage[]).reduce<{
        [widgetId: string]: { [locale: string]: WidgetLanguage };
      }>((obj, l) => {
        if (!obj[l.refId]) obj[l.refId] = {};
        obj[l.refId][l.locale] = l;
        return obj;
      }, {});
    },
    languages() {
      return (
        this.$data.languagesRaw as {
          id: string;
          refId: string;
          type: string;
          version: number;
          locale: string;
          message: { [key: string]: string };
        }[]
      ).reduce<{
        [group: string]: { [key: string]: string };
      }>((obj, l) => {
        if (l.locale !== this.$data.locale) return obj;

        if (!obj[l.refId]) {
          obj[l.refId] = {};
        }
        obj[l.refId] = {
          ...obj[l.refId],
          ...l.message,
        };
        return obj;
      }, {});
    },
  },
  watch: {
    state: {
      handler(state: PageState) {
        this.$data.responses = Object.keys(state.widgetState).reduce<
          Response[]
        >((responses, wStateKey) => {
          const wState = state.widgetState[wStateKey];
          if (wState.type !== "question") return responses;

          return [
            ...responses,
            {
              code: wState.code,
              response: wState.response,
              valid: wState.touched && wState.valid,
            },
          ];
        }, []);
      },
      immediate: true,
    },
  },
  methods: {
    togglePersistState() {
      this.$data.isPersistState = !this.$data.isPersistState;

      if (!this.$data.isPersistState) localStorage.removeItem("pageState");
      else localStorage.setItem("pageState", JSON.stringify(this.$data.state));
    },
    setLocale(locale: string) {
      this.$data.locale = locale;
    },
    setPageView(view: "builder" | "page" | "readOnly") {
      this.$data.pageView = view;
    },
    onStateChange(newState: any) {
      // FIXME: creating new PageState is the only
      // way to keep state reactive. Better way?
      this.$data.state = PageState.from(newState);

      this.$data.isPersistState &&
        localStorage.setItem("pageState", JSON.stringify(newState));
    },
    onPageChange(newPage: Page) {
      this.$data.page = newPage;
    },
    onLanguageChange(newLanguages: BuilderWidgetLanguages) {
      this.$data.languagesRaw = Object.values(newLanguages).reduce<
        WidgetLanguage[]
      >((arr, val) => [...arr, ...Object.values(val)], []);
    },
    onPageEvent({
      name,
      value,
      widget,
    }: {
      name: string;
      value: any;
      widget: WidgetItem;
      pageState: PageState;
      widgetItems: WidgetItems;
    }) {
      console.log("onPageEvent", name, value, widget);
    },
  },
});
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

.locale-switcher {
  display: flex;
  flex-direction: row;
}
.locale-switcher a {
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 8px;
}
.locale-switcher a.active {
  background-color: #e9e9e9;
}

.view-switcher {
  display: flex;
  flex-direction: row;
}
.view-switcher a {
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 8px;
}
.view-switcher a.active {
  background-color: #e9e9e9;
}
.app-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: #a9a9a9;
}
.app-bar-left-side {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.app-bar-right-side {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
