<template>
  <div v-if="!widget.getState('reflexiveHide')">
    <div class="question-wrapper">
      <label
        :for="widget.code || widget.id"
        v-if="!widget.properties.hideLabel"
        :class="{ errors: (getWidgetState('errors') || []).length }"
        >{{ t('__label', widget.id) }}</label
      >
      <div>
        <component
          :id="`widget_question_${widget.id}`"
          :data-test="`widget_question_${widget.code}`"
          :is="getQuestionControlRender(widget.properties.control)"
          :properties="widget.properties.controlProperties"
          :widget="widget"
          :widgetItems="widgetItems"
          :questionItem="widget.questionItem"
          :onChange="onChange"
          :value="widget.getState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
          :errors="getWidgetState('errors')"
          :t="(key, data) => t(`control_${key}`, data)"
          @onChange="onChange"
          @t="(key, data) => t(`control_${key}`, data)"
          @setWidgetState="setWidgetState"
          @getWidgetState="getWidgetState"
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
  WidgetControls,
  WidgetItems,
  PageState,
} from '@/entry.esm';
import { WidgetControl } from '@/lib-components/interfaces';
import { defineComponent } from '@vue/composition-api';
import { VueConstructor } from 'vue';
// import { getParents } from "../../utils";
// import { validateWidget } from "../../validateUtils";

export default defineComponent({
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
  inject: ['questionControls', 'widgetControls', 'setPageState'],
  created() {
    const widgetState = this.widget?.getState() || {};

    if (!widgetState.type || widgetState.touched === undefined) {
      this.widget?.setState({
        type: 'question',
        ...(widgetState.touched === undefined
          ? {
              touched: false,
              pristine: true,
              dirty: false,
            }
          : {}),
      });
    }
  },
  unmounted() {},
  methods: {
    onChange(response: any, ignoreChecks: boolean) {
      this.widget?.setState({
        response,
        ...(!ignoreChecks
          ? { touched: true, pristine: false, dirty: true }
          : {}),
      });

      if (ignoreChecks) return;

      (async () => {
        // handle validations
        await this.widget?.runValidations();
        this.widget?.emitListener('change');
      })();
    },
    getQuestionControlRender(type: string, view: string = 'display') {
      const widgetType: WidgetControl | undefined = (this as any)
        .questionControls?.[type];
      if (!widgetType) {
        throw new Error(
          `question control type [${type}] from widget [${this.widget?.id}] was not found. Maybe the question control was not imported`
        );
      }

      const widgetRender = widgetType[view] as VueConstructor<Vue>;
      if (!widgetRender) {
        throw new Error(
          `widget view [${view}] does not exist for question control type [${type}]`
        );
      }

      return widgetRender;
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
  /* margin-top: 10px; */
}

@media only screen and (max-width: 600px) {
  .question-wrapper {
    flex-direction: column;
  }
  .question-wrapper > label {
    border-right: none;
    padding: 10px 0 5px 0;
  }
  .question-wrapper > label.errors {
    color: #000;
  }
  .question-wrapper > div {
    padding: 5px 0 10px 0;
  }
}
</style>
