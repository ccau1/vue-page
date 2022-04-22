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
            :class="{ active: formView === 'display' }"
            v-on:click="() => setFormView('display')"
            >Customer Display</a
          >
          <a
            :class="{ active: formView === 'builder' }"
            v-on:click="() => setFormView('builder')"
            >Builder</a
          >
          <a
            :class="{ active: formView === 'readOnly' }"
            v-on:click="() => setFormView('readOnly')"
            >Read Only</a
          >
        </div>
      </div>
    </div>

    <vue-page-builder
      v-if="formView === 'builder'"
      :form="form"
      :state="state"
      :languages="languages"
      :view="formView"
      @onFormChange="onFormChange"
      @onStateChange="onStateChange"
    />
    <vue-page
      v-if="formView !== 'builder'"
      :form="form"
      :state="state"
      :languages="languages"
      :view="formView"
      @onFormChange="onFormChange"
      @onStateChange="onStateChange"
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
        <h4>Form</h4>
        <vue-json-pretty :path="'res'" :data="form" />
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
import { VuePage, Form } from "../src/lib-components";
import { FormState } from "../src/lib-components/models/FormState";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { Fragment } from "vue-fragment";

// mock data
import formData from "./mockData/form1";
import languages from "./mockData/form1_languages";

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
      formView: "display",
      isPersistState: !!persistedStateRaw,
      responses: [] as Response[],
      ...formData,
      state: !!persistedStateRaw
        ? FormState.from(JSON.parse(persistedStateRaw))
        : formData.state,
    };
  },
  computed: {
    languages() {
      return languages.reduce<{
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
      handler(state: FormState) {
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
    setFormView(view: "builder" | "form" | "readOnly") {
      this.$data.formView = view;
    },
    onStateChange(newState: any) {
      // FIXME: creating new FormState is the only
      // way to keep state reactive. Better way?
      this.$data.state = FormState.from(newState);

      this.$data.isPersistState &&
        localStorage.setItem("pageState", JSON.stringify(newState));
    },
    onFormChange(newForm: Form) {
      this.$data.form = newForm;
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
