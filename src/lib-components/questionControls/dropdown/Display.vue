<template>
  <div>
    <!-- <multiselect
      :value="selectedValue"
      :multiple="properties.multiple"
      :close-on-select="!properties.multiple"
      :placeholder="t('__placeholder', widget.id)"
      :options="options"
      track-by="value"
      label="label"
      :searchable="false"
      :show-labels="false"
      @input="onSelectChange"
    /> -->
    <select :value="value || ''" @change="onSelectChange">
      <option value="" disabled>{{ t('__placeholder') }}</option>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :selected="value === option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  DropdownProperties,
  DropdownPropertiesOption,
  PageState,
  WidgetItems,
  WidgetItem,
  WidgetError,
} from '@/entry.esm';
import { PageEventListener } from '@/lib-components/models/PageEventListener';
import QuestionWidgetItem from '@/lib-components/widgetControls/question/QuestionWidgetItem';
import { defineComponent } from '@vue/composition-api';
import {
  AllConditions,
  AnyConditions,
  ConditionProperties,
  NestedCondition,
} from 'json-rules-engine';

const QuestionControlProps = {
  properties: {
    type: Object,
    required: true as const,
  },
  widget: {
    type: Object as () => WidgetItem,
    required: true as const,
  },
  onChange: Function,
  value: {
    type: Boolean,
    required: true as const,
  },
  t: {
    type: Function,
    required: true as const,
  },
  setWidgetState: Function,
  getWidgetState: Function,
  view: {
    type: String,
    required: true as const,
  },
  errors: {
    type: Array as () => WidgetError[],
    required: false as const,
  },
};

interface Option {
  label: string;
  value: string;
}

export default defineComponent({
  props: {
    ...QuestionControlProps,
    widgetItem: Object as () => QuestionWidgetItem,
    properties: Object as () => DropdownProperties,
    value: String,
  },
  inject: ['pageEventListener', 'getPageState'],
  data() {
    return {
      options: [],
      attachedDependentCodeListeners: [],
    } as {
      options: Array<Option>;
      attachedDependentCodeListeners: [name: string, fn: () => void][];
    };
  },
  created() {
    if (!this.value && this.properties?.defaultValue) {
      this.onChange?.(this.properties.defaultValue);
    }
  },
  unmounted() {
    // remove conditional listeners
    this.attachedDependentCodeListeners.forEach(([name, fn]) => {
      (this.pageEventListener as PageEventListener)?.remove(name, fn);
    });
  },
  watch: {
    ['properties.options']: {
      async handler() {
        // recursively go through conditions and get all facts
        const getConditionFacts = (conditions: NestedCondition[]): string[] => {
          return [
            ...new Set(
              conditions.reduce<string[]>((arr, condition) => {
                if ((condition as AnyConditions).any) {
                  return [
                    ...arr,
                    ...getConditionFacts((condition as AnyConditions).any),
                  ];
                } else if ((condition as AllConditions).all) {
                  return [
                    ...arr,
                    ...getConditionFacts((condition as AllConditions).all),
                  ];
                } else {
                  return [...arr, (condition as ConditionProperties).fact];
                }
              }, [])
            ),
          ];
        };

        // go through each option and extract condition fact names
        const allDependentCodes = [
          ...new Set(
            (
              this.widget?.properties.controlProperties as DropdownProperties
            ).options.reduce<string[]>((arr, option) => {
              return [
                ...arr,
                ...(option.conditions?.length
                  ? getConditionFacts(option.conditions)
                  : []),
              ];
            }, [])
          ),
        ];

        // sync listeners for filtering options
        this.widget?.setListenerSet(
          'options',
          allDependentCodes.map((c) => `${c}_change`),
          () => this.setFilteredOptions()
        );

        // set initial filtered options
        this.setFilteredOptions();
      },
      immediate: true,
    },
  },
  computed: {
    selectedValue(): Option | undefined {
      return (this.$data.options as Array<Option>).find(
        (o) => o.value === this.value
      );
    },
  },
  methods: {
    async setFilteredOptions() {
      this.$data.options = (await (this as any).getFilteredOptions()).map(
        (opt: { labelKey: string; value: string }) => ({
          value: opt.value,
          label: (this as any).t(opt.labelKey),
        })
      );
    },
    async getFilteredOptions(): Promise<DropdownPropertiesOption[]> {
      // build facts data into:
      // { [idOrCode: string]: response }
      const validateData = Object.keys(
        (this.widgetItems as WidgetItems) || {}
      ).reduce<{
        [idOrCode: string]: any;
      }>((obj, widgetItemId: string) => {
        const response = (this.getPageState as () => PageState)()?.widgetState[
          widgetItemId
        ]?.response;
        if (response) {
          obj[widgetItemId] = response;
          if ((this.widgetItems as WidgetItems)[widgetItemId].code) {
            obj[(this.widgetItems as WidgetItems)[widgetItemId].code || ''] =
              response;
          }
        }
        return obj;
      }, {});

      // go through each option and validate them based on its conditions
      // (if they have any) against responses set above.
      // Only return ones that meets validate() or does not have conditions at all
      return (
        await Promise.all(
          (
            this.widget?.properties.controlProperties as DropdownProperties
          ).options.map(async (opt) => {
            return !opt.conditions?.length ||
              (await this.widget?.validator.validate(
                opt.conditions,
                validateData
              ))
              ? opt
              : null;
          })
        )
      ).filter((a) => a) as DropdownPropertiesOption[];
    },
    onSelectChange(ev: Event) {
      this.onChange?.((ev.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
