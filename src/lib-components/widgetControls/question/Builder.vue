<template>
  <div v-if="!widget.getState('reflexiveHide')">
    <div class="question-wrapper">
      <label
        v-if="!widget.properties.hideLabel"
        :for="widget.code || widget.id"
        :class="{ errors: (getWidgetState('errors') || []).length }"
      >
        <textarea
          ref="labelInput"
          :value="t('__label', widget.id)"
          class="text-input"
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          @input="(ev) => updateText('label', ev.target.value)"
        />
      </label>
      <div>
        <component
          :is="questionControls[widget.properties.control].display"
          :properties="widget.properties.controlProperties"
          :widget="widget"
          :widget-items="widgetItems"
          :on-change="onChange"
          :value="widget.getState('response')"
          :set-widget-state="setWidgetState"
          :get-widget-state="getWidgetState"
          :view="view"
          :errors="getWidgetState('errors')"
          :t="(key, data) => t(`control_${key}`, data)"
        />

        <template v-if="getWidgetState('dirty') && getWidgetState('errors')">
          <span
            v-for="(errorKey, errorKeyIndex) in getWidgetState('errors').slice(
              0,
              1
            )"
            :key="`${errorKey.err}_${errorKeyIndex}`"
            class="error"
          >
            <template v-if="t(`control_${errorKey.err}`)">{{
              t(`control_${errorKey.err}`, errorKey.data)
            }}</template>
            <template v-else>{{
              t(`${errorKey.err}`, errorKey.data)
            }}</template>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  WidgetItem,
  WidgetItems,
  WidgetControls,
  PageState,
} from '@/entry.esm';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  inject: [
    'questionControls',
    'widgetControls',
    'getPageState',
    'setPageState',
    'getLocale',
    'setMessage',
  ],
  props: {
    widget: {
      type: Object as () => WidgetItem,
      required: true,
    },
    widgetControls: {
      type: Object as () => WidgetControls,
      required: true,
    },
    widgetItems: {
      type: Object as () => WidgetItems,
      required: true,
    },
    pageState: {
      type: Object as () => PageState,
      required: true,
    },
    setWidgetState: {
      type: Function,
      required: true,
    },
    getWidgetState: {
      type: Function,
      required: true,
    },
    t: Function,
    view: String,
  },
  created() {
    this.widget.setState({
      type: 'question',
      ...(this.widget.getState()?.touched === undefined
        ? {
            touched: false,
            pristine: true,
            dirty: false,
          }
        : {}),
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.labelInput) return;
      (this.$refs.labelInput as HTMLTextAreaElement).style.height = '';

      (this.$refs.labelInput as HTMLTextAreaElement).style.height =
        (this.$refs.labelInput as HTMLTextAreaElement).scrollHeight + 'px';
    });
  },
  methods: {
    updateText(name: string, text: string): void {
      (this as any).setMessage({
        id: this.$props.widget.id,
        locale: (this as any).getLocale(),
        key: `__${name}`,
        value: text.replaceAll(/\n|\r/g, ''),
      });
    },
    onChange(response: any, ignoreChecks?: boolean) {
      this.widget?.setState({
        response,
        ...(!ignoreChecks
          ? { touched: true, pristine: false, dirty: true }
          : {}),
      });

      if (ignoreChecks) return;

      (async () => {
        // handle validations
        await this.widget.runValidations();
        this.widget.emitListener('change');
      })();
    },
  },
});
</script>

<style scoped>
.question-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.question-wrapper > label {
  flex: 1;
  max-width: 300px;
  border-right: 1px solid #393939;
  padding: 20px 0;
  margin-right: 20px;
}
.question-wrapper > label.errors {
  color: #f00;
}

.question-wrapper > div {
  flex: 2;
  padding: 20px 0px;
}

.error {
  display: block;
  color: red;
  margin-top: 10px;
}

.text-input {
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  resize: none;
  min-height: 10px;
  margin-bottom: -15px;
}
</style>
