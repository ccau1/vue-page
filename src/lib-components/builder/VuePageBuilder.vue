<template>
  <div class="main-wrapper">
    <div class="main-pane-wrapper">
      <builder-left-pane :widgetItems="widgetItems">
        <builder-right-pane :widgetItems="widgetItems">
          <builder-screen-simulation-view>
            <builder-widgets-layout
              :widgetControls="combWidgetControls"
              :widgetItems="widgetItems"
            />
          </builder-screen-simulation-view>
        </builder-right-pane>
      </builder-left-pane>
    </div>
    <builder-bottom-pane :widgetItems="widgetItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { widgets as sysWidgets } from '../widgetControls';
import { widgetEffects as sysWidgetEffectControls } from '../widgetEffectControls';
import { questionControls as sysQuestionControls } from '../questionControls';
import { Page, Widget } from '..';
import { PageState } from '../models/PageState';
import BuilderWidgetsLayout from './BuilderWidgetsLayout.vue';
import { WidgetItem } from '../models/WidgetItem';
import {
  BuilderWidgetLanguages,
  Event,
  flattenTranslateKey,
  PageConfig,
  PagesProperties,
  WidgetItems,
} from '@/entry.esm';
import {
  TranslateKey,
  TranslateData,
  WidgetError,
  WidgetControls,
  PageConfigValidations,
} from '../interfaces';
import { cachedMerge } from '../utils';
import BuilderRightPane from './BuilderRightPane.vue';
import BuilderLeftPane from './BuilderLeftPane.vue';
import BuilderBottomPane from './BuilderBottomPane.vue';
import { PageEventListener } from '../models/PageEventListener';
import BuilderScreenSimulationView from './BuilderScreenSimulationView.vue';
import { QuestionControls } from '../questionControls/QuestionControl';
import { WidgetEffectControls } from '../models';
import { Engine } from 'json-rules-engine';
import validationRules from '../validationRules';
import Validator from '../models/Validator';

export default defineComponent({
  components: {
    BuilderWidgetsLayout,
    BuilderRightPane,
    BuilderLeftPane,
    BuilderBottomPane,
    BuilderScreenSimulationView,
  },
  // components: { DynamicPageLayout },
  props: {
    languages: {
      type: Object as () => BuilderWidgetLanguages,
      required: true,
    },
    locale: String,
    page: {
      type: Object as () => Page,
      required: true,
    },
    onPageChange: Function,
    state: {
      type: Object as () => PageState,
      required: true,
    },
    onStateChange: Function,
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
          Event.LANGUAGE_CHANGED,
          {}
        );
      },
    },
    'page.widgets': {
      handler(newPageWidgetArr) {
        this.$data.widgetItems = newPageWidgetArr.reduce(
          (obj: { [widgetId: string]: WidgetItem }, widget: Widget) => {
            const WidgetItemClass =
              this.combWidgetControls[widget.type]?.widgetItem || WidgetItem;
            obj[widget.id] = new WidgetItemClass({
              widget,
              pageEventListener: this.pageEventListener,
              emitEvent: this.emitEvent,
              removeWidget: this.removeWidget,
              t: (key: string | string[], data?: { [key: string]: any }) =>
                this.t([widget.id, key], data),
              getState: () => this.state,
              setState: (newPageState: PageState) => {
                this.$emit('onStateChange', newPageState);
              },
              onUpdate: (newWidget: WidgetItem) => {
                this._onPageChange({
                  ...this.page,
                  widgets: Object.values({
                    ...this.$data.widgetItems,
                    // clone widget object to trigger change
                    [newWidget.id]: Object.assign(
                      Object.create(Object.getPrototypeOf(newWidget)),
                      newWidget
                    ),
                  }),
                });
              },
              getQuestionControls: () => this.combQuestionControls,
              getConfig: () => ({
                ...this.getConfig(),
                validations: this.validations,
              }),
              getWidgetMeta: () => this.getConfig()?.meta?.[widget.type],
              getValidator: this.getValidator,
            });
            return obj;
          },
          {}
        );
        Object.values(this.$data.widgetItems).forEach((widgetItem) => {
          (widgetItem as WidgetItem).setWidgetItems(this.$data.widgetItems);
        });
        if (this.config?.widgetsToExclude?.length) {
          this.excludeWidgets(this.config.widgetsToExclude);
        }
      },
      immediate: true,
      deep: true,
    },
    'config.validations.facts': {
      handler(validations?: PageConfigValidations) {
        const ruleEngine = new Engine(undefined, { allowUndefinedFacts: true });
        if (validations?.facts && Object.keys(validations?.facts).length) {
          Object.keys(validations.facts).forEach((factKey) => {
            ruleEngine.addFact(factKey, validations.facts?.[factKey]);
          });
        }

        this.ruleEngine = ruleEngine;
      },
      deep: true,
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
    _onPageChange(newPage: Page): void {
      this.onPageChange?.(newPage);
      this.$emit('onPageChange', newPage);
    },
    t(key: TranslateKey, data?: TranslateData): string {
      const lang = flattenTranslateKey(key).reduce<
        { [key: string]: any } | string
      >((obj, g, gIndex) => {
        if (typeof obj === 'string') return obj;

        return gIndex > 0
          ? obj?.[g]
          : obj?.[g][this.locale || ''].message || {};
      }, this.languages);

      return lang?.replace(
        /(\{(\w+)\})/g,
        (_orig: string, _outer: string, inner: string) => (data || {})[inner]
      );
    },
    getConfig(): PageConfig {
      return this.config || {};
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
          const pageIdxToRemove: number[] = [];
          (widget.properties as PagesProperties).pages.forEach(
            (page, pageIdx) => {
              if (page.children.every((c) => excludedWidgetIds.includes(c))) {
                pageIdxToRemove.push(pageIdx);
              }
            }
          );
          if (pageIdxToRemove.length) {
            pageIdxToRemove.reverse().forEach((idx) => {
              (widget.properties as PagesProperties).pages.splice(idx, 1);
            });
          }
        }
      });
    },
    async emitEvent(
      name: string,
      value?: any,
      widget?: WidgetItem
    ): Promise<void> {
      if (Array.isArray(this.$listeners.event)) {
        await Promise.all(
          this.$listeners.event.map((evFn) =>
            evFn({
              name,
              value,
              widget,
              pageState: this.pageState,
              widgetItems: this.$data.widgetItems,
            })
          )
        );
      } else {
        await this.$listeners.event?.({
          name,
          value,
          widget,
          pageState: this.pageState,
          widgetItems: this.$data.widgetItems,
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
        if (!result) {
          return _obj;
        }
        _obj[wi.code || wi.id] = result;

        return _obj;
      }, Promise.resolve({}));

      return validationResults;
    },
    setMessage({
      id,
      locale,
      key,
      value,
      type = 'pageItem',
    }: {
      id: string;
      locale: string;
      key: string;
      value: string;
      type?: string;
    }) {
      const newLanguages = { ...this.languages };
      if (!newLanguages[id]) newLanguages[id] = {};
      if (!newLanguages[id][locale])
        newLanguages[id][locale] = {
          id: '',
          refId: id,
          type,
          version: 1,
          locale,
          message: {},
        };

      newLanguages[id][locale].message[key] = value;
      this.$emit('onLanguageChange', newLanguages);
    },
    updatePage(page: Page): void {
      this.$emit('onPageChange', page);
    },
    updateWidget(widget: WidgetItem): void {
      this.$data.widgetItems[widget.id] = widget;
      this.updatePage({
        ...this.page,
        widgets: Object.values(this.$data.widgetItems).map((m) => m.widget),
      });
    },
    removeWidget(widgetId: string): void {
      this.updatePage({
        ...this.page,
        widgets: Object.keys(this.$data.widgetItems).reduce<Widget[]>(
          (arr, _widgetId) => {
            if (_widgetId === widgetId) return arr;
            return [...arr, this.$data.widgetItems[_widgetId].widget];
          },
          []
        ),
      });
      // remove languages
      const newLanguages = { ...this.languages };
      delete newLanguages[widgetId];
      this.$emit('onLanguageChange', newLanguages);
    },
  },
  provide() {
    return {
      getConfig: () => this.configs,
      getView: () => this.view,
      t: this.t,
      pageEventListener: this.pageEventListener,
      emitEvent: this.emitEvent,
      getLocale: () => this.locale,
      languages: this.languages,
      setMessage: this.setMessage,
      updateWidget: this.updateWidget,
      removeWidget: this.removeWidget,
      getPageState: () => this.state,
      setPageState: (newPageState: PageState) => {
        this.$emit('onStateChange', newPageState);
      },
      widgetEffectControls: this.combWidgetEffectControls,
      widgetControls: this.combWidgetControls,
      questionControls: this.combQuestionControls,
      validateAll: this.validateAll,
      validations: this.validations,
      getRuleEngine: this.getRuleEngine,
    };
  },
  expose: ['validateAll'],
});
</script>

<style scoped>
.main-pane-wrapper {
  flex: 1;
  overflow: auto;
}
.main-wrapper {
  font-family: Arial, Helvetica, sans-serif;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.widgets-layout-wrapper {
  padding: 30px;
  background-color: #eaedf5;
  height: 100%;
  box-sizing: border-box;
}
.widgets-layout-inner-wrapper {
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
