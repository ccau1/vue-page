<template>
  <div>
    <div class="appBar">
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
      <div class="view-switcher">
        <a
          :class="{ active: formView === 'display' }"
          v-on:click="() => setFormView('display')"
          >Customer Form</a
        >
        <a
          :class="{ active: formView === 'form' }"
          v-on:click="() => setFormView('form')"
          >Builder</a
        >
        <a
          :class="{ active: formView === 'readOnly' }"
          v-on:click="() => setFormView('readOnly')"
          >View Only</a
        >
      </div>
    </div>

    <DynamicForm
      :form="form"
      :state="state"
      :languages="languages"
      :view="formView"
      @onFormChange="onFormChange"
      @onStateChange="onStateChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { DynamicForm, Form } from "./components/DynamicForm";
import { FormState } from "./components/DynamicForm/models/FormState";

// mock data
import formData from "./mockData/form1";
import languages from "./mockData/form1_languages";

export default defineComponent({
  components: {
    DynamicForm,
  },
  data() {
    return {
      locale: "en",
      formView: "display",
      ...formData,
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
  methods: {
    setLocale(locale: string) {
      this.$data.locale = locale;
    },
    setFormView(view: "display" | "form" | "readOnly") {
      this.$data.formView = view;
    },
    onStateChange(newState: any) {
      this.$data.state = new FormState(newState);
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
.appBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: #a9a9a9;
}
</style>
