<template>
  <div class="main-wrapper">
    <widgets-layout
      :widgetControls="combWidgetControls"
      :widgetItems="widgetItems"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { widgets as sysWidgets } from './widgetControls';
import { widgetEffects as sysWidgetEffectControls } from './widgetEffectControls';
import { questionControls as sysQuestionControls } from './questionControls';
import { Page, Widget } from '.';
import { PageState } from './models/PageState';
import WidgetsLayout from './WidgetsLayout.vue';
import { WidgetItem } from './models/WidgetItem';
import {
  PageConfig,
  PagesProperties,
  WidgetItemConstructorOptions,
  WidgetItems,
} from '@/entry.esm';
import { cachedMerge } from './utils';
import { PageEventListener } from './models/PageEventListener';
import {
  TranslateKey,
  TranslateData,
  WidgetControls,
  WidgetError,
  PageConfigValidations,
} from './interfaces';
import { translate } from './utils';
import { WidgetEffectControls } from './models';
import { QuestionControls } from './questionControls/QuestionControl';
import { Engine } from 'json-rules-engine';
import validationRules from './validationRules';
import Validator from './models/Validator';

export default defineComponent({
  components: { WidgetsLayout },
  emits: {
    event: (_options: {
      name: string;
      value: any;
      widget: WidgetItem;
      pageState: PageState;
      widgetItems: WidgetItems;
    }) => true,
    onStateChange: (_newState: PageState) => true,
    onPageChange: (_newPage: Page) => true,
  },
  props: {
    languages: {
      type: Object as () => {
        [widgetId: string]: { [key: string]: string } | string;
      },
      required: true,
    },
    page: {
      type: Object as () => Page,
      required: true,
    },
    onPageChange: Function,
    state: {
      type: Object as () => PageState,
      required: true,
    },
    widgetControls: Object as () => WidgetControls,
    questionControls: Object as () => QuestionControls,
    widgetEffectControls: Object as () => WidgetEffectControls,
    plugins: Array as () => Array<{
      widgetControls: Object;
      widgetEffectControls: Object;
      questionControls: Object;
    }>,
    // display | page | readOnly
    view: String,
    config: Object as () => PageConfig,
  },
  data() {
    return {
      widgetItems: {},
      pageEventListener: new PageEventListener({
        emitEvent: (this as any).emitEvent,
      }),
    } as {
      widgetItems: WidgetItems;
      pageEventListener: PageEventListener;
    };
  },
  computed: {
    widgetItemsArr(): Widget[] {
      return this.page.widgets;
    },
    combWidgetControls(): WidgetControls {
      return cachedMerge(
        'widgetControls',
        this.config?.widgetControls?.disableInternalControls ? {} : sysWidgets,
        ...(this.plugins || [])?.map((p) => p.widgetControls),
        this.widgetControls
      );
    },
    combWidgetEffectControls(): WidgetEffectControls {
      return cachedMerge(
        'widgetEffectControls',
        this.config?.widgetEffectControls?.disableInternalControls
          ? {}
          : sysWidgetEffectControls,
        ...(this.plugins || [])?.map((p) => p.widgetEffectControls),
        this.widgetEffectControls
      );
    },
    combQuestionControls(): QuestionControls {
      return cachedMerge(
        'questionControls',
        this.config?.questionControls?.disableInternalControls
          ? {}
          : sysQuestionControls,
        ...(this.plugins || [])?.map((p) => p.questionControls),
        this.questionControls
      );
    },
    validations(): PageConfigValidations {
      return {
        rules: {
          ...validationRules,
          ...this.config?.validations?.rules,
        },
        facts: {
          ...this.config?.validations?.facts,
        },
      };
    },
    pageState(): PageState {
      return this.state;
    },
  },
  watch: {
    languages: {
      handler() {
        (this.pageEventListener as PageEventListener).emit(
          'languages_changed',
          {}
        );
      },
    },
    'page.widgets': {
      handler(newPageWidgetArr) {
        this.widgetItems = newPageWidgetArr.reduce(
          (obj: { [widgetId: string]: WidgetItem }, widget: Widget) => {
            const WidgetItemClass =
              this.combWidgetControls[widget.type]?.widgetItem || WidgetItem;
            obj[widget.id] = new WidgetItemClass({
              widget,
              pageEventListener: this.pageEventListener,
              emitEvent: this.emitEvent,
              t: (key: string, data?: { [key: string]: any }) =>
                this.t([widget.id, key], data),
              getState: () => this.state,
              setState: (newPageState: PageState) => {
                this.$emit('onStateChange', newPageState);
              },
              onUpdate: (newWidget: WidgetItem) => {
                this._onPageChange({
                  ...this.page,
                  widgets: Object.values({
                    ...this.widgetItems,
                    // clone widget object to trigger change
                    [newWidget.id]: Object.assign(
                      Object.create(Object.getPrototypeOf(newWidget)),
                      newWidget
                    ),
                  }),
                });
              },
              getQuestionControls: () => this.combQuestionControls,
              getConfig: this.getConfig,
              getWidgetMeta: () => this.getConfig()?.meta?.[widget.type],
              getValidator: this.getValidator,
            } as WidgetItemConstructorOptions);
            return obj;
          },
          {}
        );
        Object.values(this.widgetItems).forEach((widgetItem) => {
          widgetItem.setWidgetItems(this.widgetItems);
        });
        if (this.config?.widgetsToExclude?.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },
      immediate: true,
      // deep: true,
    },
    'config.widgetsToExclude': {
      handler() {
        if (this.config?.widgetsToExclude?.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },
      deep: true,
    },
  },
  methods: {
    _onPageChange(newPage: Page) {
      this.onPageChange?.(newPage);
      this.$emit('onPageChange', newPage);
    },
    t(key: TranslateKey, data?: TranslateData) {
      return translate(this.languages, key, data);
    },
    getConfig(): PageConfig | undefined {
      return {
        ...this.config,
        validations: this.validations,
      };
    },
    getValidator(): Validator {
      const validator = new Validator(this.validations);

      return validator;
    },
    getRuleEngine(): Engine {
      return this.getValidator().getRuleEngine();
    },
    excludeWidgets(widgetIdsOrCodes: string[]) {
      // map and ensure a list of ids (config.widgetsToExclude can be code or id)
      const excludedWidgetIds = Object.values(this.widgetItems)
        .filter(
          (w) =>
            widgetIdsOrCodes.includes(w.id) ||
            widgetIdsOrCodes.includes(w.code || '')
        )
        .map((w) => w.id);
      // go through widgets and remove all widgets
      excludedWidgetIds.forEach((widgetId) => {
        delete this.widgetItems[widgetId];
      });
      // go through all pages and remove all pages that only holds excluded widgets
      Object.values(this.widgetItems).forEach((widget) => {
        if (widget.type === 'pages') {
          const pages = (widget.properties as PagesProperties).pages;
          // go through each page from the end to start, and remove any
          // children excluded. If pages is empty after, remove it as well
          for (let p = pages.length - 1; p >= 0; p--) {
            const children = pages[p].children;
            for (let c = children.length - 1; c >= 0; c--) {
              if (excludedWidgetIds.includes(children[c])) {
                children.splice(c, 1);
              }
            }
            if (!children.length) {
              pages.splice(p, 1);
            }
          }
        }
      });
    },
    async emitEvent(name: string, value?: any, widget?: WidgetItem) {
      if (Array.isArray(this.$listeners.event)) {
        await Promise.all(
          this.$listeners.event.map((evFn) =>
            evFn({
              name,
              value,
              widget,
              pageState: this.pageState,
              widgetItems: this.widgetItems,
            })
          )
        );
      } else {
        await this.$listeners.event?.({
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.widgetItems,
        });
      }
    },
    async validateAll(opts?: {
      setDirty?: boolean;
    }): Promise<{ [widgetCodeOrId: string]: WidgetError[] }> {
      const validationResults = await Object.values(this.widgetItems).reduce<
        Promise<{ [widgetCodeOrId: string]: WidgetError[] }>
      >(async (obj, wi) => {
        const _obj = await obj;
        const result = await wi.runValidations({
          setDirty: opts?.setDirty || false,
        });
        // if result is null or all warnings,
        // there's no error to handle, just return
        if (!result || (result || []).every((e) => e.isWarning)) {
          return _obj;
        }
        _obj[wi.code || wi.id] = result;

        return _obj;
      }, Promise.resolve({}));

      return validationResults;
    },
  },
  provide() {
    return {
      getConfig: this.getConfig,
      getView: () => this.view,
      t: this.t,
      pageEventListener: this.pageEventListener,
      languages: this.languages,
      getPageState: () => this.state,
      setPageState: (newPageState: PageState) => {
        this.$emit('onStateChange', newPageState);
      },
      emitEvent: this.emitEvent,
      widgetEffectControls: this.combWidgetEffectControls,
      widgetControls: this.combWidgetControls,
      questionControls: this.combQuestionControls,
      validateAll: this.validateAll,
      validations: this.validations,
      getRuleEngine: this.getRuleEngine,
      getValidator: this.getValidator,
    };
  },
  expose: ['validateAll'],
});
</script>

<style scoped>
.main-wrapper {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
