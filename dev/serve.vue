<template>
  <div>
    <div class="wrapper">
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

      <div class="content-wrapper">
        <vue-page-builder
          v-if="pageView === 'builder'"
          :page="page"
          :state="state"
          :languages="builderLanguages"
          :view="pageView"
          :locale="locale"
          :config="config"
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
          :config="config"
          @onStateChange="onStateChange"
          @event="onPageEvent"
        />
      </div>
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        overflow: auto;
      "
    >
      <div style="flex: 1; padding: 10px">
        <h4>State</h4>
        <vue-json-pretty :path="'res'" :data="state" />
      </div>
      <div style="flex: 1; padding: 10px; background-color: #f8f8f8">
        <h4>Responses (generated from state)</h4>
        <vue-json-pretty :path="'res'" :data="responses" />
      </div>
      <div style="flex: 1; padding: 10px">
        <h4>Page</h4>
        <vue-json-pretty
          :path="'res'"
          :data="{
            ...page,
            widgets: page.widgets.map((w) => w._widget || w),
          }"
        />
      </div>
      <div style="flex: 1; padding: 10px; background-color: #f8f8f8">
        <h4>Languages</h4>
        <vue-json-pretty :path="'res'" :data="languages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import {
  VuePage,
  Page,
  WidgetLanguage,
  BuilderWidgetLanguages,
  WidgetItems,
  PageConfig,
} from '../src/lib-components';
import { PageState } from '../src/lib-components/models/PageState';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { Fragment } from 'vue-fragment';

// mock data
import pageData from './mockData/page1';
import _languages from './mockData/page1_languages';
import { WidgetItem } from '@/lib-components/models/WidgetItem';

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
    const persistedStateRaw = localStorage.getItem('pageState');

    return {
      locale: 'en',
      pageView: 'display',
      isPersistState: !!persistedStateRaw,
      responses: [] as Response[],
      languagesRaw: _languages,
      ...pageData,
      state: !!persistedStateRaw
        ? PageState.from(JSON.parse(persistedStateRaw))
        : pageData.state,
      config: {
        // validations: {
        //   rules: validationRules,
        // },
      },
    } as {
      page: Page;
      locale: string;
      pageView: string;
      isPersistState: boolean;
      responses: Response[];
      languagesRaw: WidgetLanguage[];
      state: PageState;
      config: PageConfig;
    };
  },
  computed: {
    builderLanguages() {
      return (this.languagesRaw as WidgetLanguage[]).reduce<{
        [widgetId: string]: { [locale: string]: WidgetLanguage };
      }>((obj, l) => {
        if (!obj[l.refId]) obj[l.refId] = {};
        obj[l.refId][l.locale] = l;
        return obj;
      }, {});
    },
    languages() {
      return (
        this.languagesRaw as {
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
        if (l.locale !== this.locale) return obj;

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
        this.responses = Object.keys(state.widgetState).reduce<Response[]>(
          (responses, wStateKey) => {
            const wState = state.widgetState[wStateKey];
            if (wState.type !== 'question') return responses;

            return [
              ...responses,
              {
                code: wState.code,
                response: wState.response,
                valid: wState.touched && wState.valid,
              },
            ];
          },
          []
        );
      },
      immediate: true,
    },
  },
  methods: {
    // FIXME: seems a bit heavy to manipulate it every time obj changes,
    // but only for json display which doesn't effect production
    removeCircularRef(obj: object) {
      let m = new Map(),
        v = new Map(),
        init: any = null;

      const _this = this;

      const replacer = function (field: string, value: any) {
        let p =
          m.get(_this) + (Array.isArray(_this) ? `[${field}]` : '.' + field);
        let isComplex = value === Object(value);

        if (isComplex) m.set(value, p);

        let pp = v.get(value) || '';
        let path = p.replace(/undefined\.\.?/, '');
        let val = pp ? `#REF:${pp[0] == '[' ? '$' : '$.'}${pp}` : value;

        !init ? (init = value) : val === init ? (val = '#REF:$') : 0;
        if (!pp && isComplex) v.set(value, path);

        return val;
      };

      return JSON.parse(JSON.stringify(obj, replacer));
    },
    togglePersistState() {
      this.isPersistState = !this.isPersistState;

      if (!this.isPersistState) localStorage.removeItem('pageState');
      else localStorage.setItem('pageState', JSON.stringify(this.state));
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
    setPageView(view: 'builder' | 'page' | 'readOnly') {
      this.pageView = view;
    },
    onStateChange(newState: any) {
      // FIXME: creating new PageState is the only
      // way to keep state reactive. Better way?
      this.state = PageState.from(newState);

      this.isPersistState &&
        localStorage.setItem('pageState', JSON.stringify(newState));
    },
    onPageChange(newPage: Page) {
      this.page = newPage;
    },
    onLanguageChange(newLanguages: BuilderWidgetLanguages) {
      this.languagesRaw = Object.values(newLanguages).reduce<WidgetLanguage[]>(
        (arr, val) => [...arr, ...Object.values(val)],
        []
      );
    },
    async onPageEvent({
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
      console.info('onPageEvent', name, value, widget);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
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
.content-wrapper {
  flex: 1;
  position: relative;
}
</style>
