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
      <option value="" disabled>{{ t("__placeholder", widget.id) }}</option>
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
import { DropdownProperties, PageState, WidgetItems } from "@/entry.esm";
import { PageEventListener } from "@/lib-components/models/PageEventListener";
import QuestionWidgetItem from "@/lib-components/widgetControls/question/QuestionWidgetItem";
import { defineComponent } from "@vue/composition-api";
import {
  AllConditions,
  AnyConditions,
  ConditionProperties,
  NestedCondition,
} from "json-rules-engine";
import { QuestionControlProps } from "../index";
// import Multiselect from "vue-multiselect";
// import "vue-multiselect/dist/vue-multiselect.min.css";

export default defineComponent<
  QuestionControlProps<DropdownProperties, string, QuestionWidgetItem>,
  {
    options: Array<{ label: string; value: string }>;
    attachedDependentCodeListeners: [name: string, fn: () => void][];
    pageEventListener: PageEventListener;
    setFilteredOptions: () => void;
    getPageState: () => PageState;
  }
>({
  // components: { Multiselect },
  props: {
    properties: Object,
    widget: Object,
    onChange: Function,
    value: String,
    widgetItems: Object,
  },
  inject: ["t", "pageEventListener", "getPageState"],
  data() {
    return {
      options: [],
      attachedDependentCodeListeners: [],
    } as {
      options: Array<{ label: string; value: string }>;
      attachedDependentCodeListeners: [name: string, fn: () => void][];
    };
  },
  created() {},
  unmounted() {
    // remove conditional listeners
    this.attachedDependentCodeListeners.forEach(([name, fn]) => {
      this.pageEventListener.remove(name, fn);
    });
  },
  watch: {
    ["properties.options"]: {
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
              this.$props.widget.properties
                .controlProperties as DropdownProperties
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
        this.widget.setListenerSet(
          "options",
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
    selectedValue() {
      return (
        this.$data.options as Array<{ label: string; value: string }>
      ).find((o) => o.value === this.$props.value);
    },
  },
  methods: {
    async setFilteredOptions() {
      this.$data.options = (await (this as any).getFilteredOptions()).map(
        (opt: { labelKey: string; value: string }) => ({
          value: opt.value,
          label: (this as any).t(opt.labelKey, this.$props.widget.id),
        })
      );
    },
    async getFilteredOptions() {
      // build facts data into:
      // { [idOrCode: string]: response }
      const validateData = Object.keys(this.$props.widgetItems).reduce<{
        [idOrCode: string]: any;
      }>((obj, widgetItemId: string) => {
        const response =
          this.getPageState()?.widgetState[widgetItemId]?.response;
        if (response) {
          obj[widgetItemId] = response;
          if ((this.$props.widgetItems as WidgetItems)[widgetItemId].code) {
            obj[
              (this.$props.widgetItems as WidgetItems)[widgetItemId].code || ""
            ] = response;
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
            this.$props.widget.properties
              .controlProperties as DropdownProperties
          ).options.map(async (opt) => {
            return !opt.conditions?.length ||
              (await this.$props.widget.validate(opt.conditions, validateData))
              ? opt
              : null;
          })
        )
      ).filter((a) => a);
    },
    onSelectChange(ev: Event) {
      this.$props.onChange((ev.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style scoped>
.radio-item {
  margin-right: 10px;
}
</style>
