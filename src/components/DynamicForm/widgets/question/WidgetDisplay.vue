<template>
  <div v-if="!getWidgetState('reflexiveHide')">
    <div class="question-wrapper">
      <label>{{ t("__label", widget.id) }}</label>
      <div>
        <component
          :is="questionControls[widget.data.control].display"
          :data="widget.data.controlData"
          :widget="widget"
          :onChange="onChange"
          :value="getWidgetState('response')"
          :setWidgetState="setWidgetState"
          :getWidgetState="getWidgetState"
          :view="view"
          :t="t"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    widget: Object,
    widgetControls: Object,
    formWidgets: Object,
    setWidgetState: Function,
    getWidgetState: Function,
    view: String,
  },
  inject: [
    "t",
    "questionControls",
    "widgetControls",
    "getFormState",
    "setFormState",
  ],
  created() {
    if (!this.formState.widgetState.__questionsCodeWidgetIdMap)
      this.formState.widgetState.__questionsCodeWidgetIdMap = {};

    this.formState.widgetState.__questionsCodeWidgetIdMap[
      this.$props.widget.data.code
    ] = this.$props.widget.id;

    if (this.$props.widget.reflexives?.length) {
      if (!this.formState.widgetState.__qReflexiveWatch) {
        this.formState.widgetState.__qReflexiveWatch = {};
      }

      this.$props.widget.reflexives.map((reflexive) => {
        if (!this.formState.widgetState.__qReflexiveWatch[reflexive.fact]) {
          this.formState.widgetState.__qReflexiveWatch[reflexive.fact] = [];
        }
        this.formState.widgetState.__qReflexiveWatch[reflexive.fact] = [
          ...new Set([
            ...this.formState.widgetState.__qReflexiveWatch[reflexive.fact],
            this.$props.widget.id,
          ]),
        ];
      });

      this.$props.widgetControls[this.$props.widget.type].handleReflexives({
        widget: this.$props.widget,
        widgetId: this.$props.widget.id,
        formWidgets: this.$props.formWidgets,
        formState: this.formState,
        setFormState: this.setFormState,
      });
    }

    this.setFormState(this.formState);
  },
  unmounted() {
    // remove code from questions mapper
    delete this.formState.widgetState.__questionsCodeWidgetIdMap[
      this.$props.widget.data.code
    ];

    if (this.$props.widget.reflexives?.length) {
      this.$props.widget.reflexives.forEach((reflexive) => {
        const reflexiveWatchListIndex = (
          this.formState.widgetState.__qReflexiveWatch[reflexive.fact] || []
        ).findIndex((f) => f === this.$props.widget.id);

        if (reflexiveWatchListIndex > -1) {
          this.formState.widgetState.__qReflexiveWatch[reflexive.fact].splice(
            reflexiveWatchListIndex,
            1
          );
        }
      });
      this.setFormState(this.formState);
    }
  },
  computed: {
    formState() {
      return this.getFormState();
    },
  },
  methods: {
    onChange(response) {
      this.setWidgetState("response", response);

      const reflexiveWatches =
        this.formState.widgetState.__qReflexiveWatch?.[
          this.$props.widget.data.code
        ];
      if (reflexiveWatches) {
        // go through each reflexiveWatches and tell them to do
        // their reflexives
        reflexiveWatches.forEach((reflexiveWidgetId) => {
          const widgetToCheckReflexive =
            this.$props.formWidgets[reflexiveWidgetId];

          this.widgetControls[widgetToCheckReflexive.type].handleReflexives?.({
            widget: widgetToCheckReflexive,
            widgetId: reflexiveWidgetId,
            formWidgets: this.$props.formWidgets,
            formState: this.formState,
            setFormState: this.setFormState,
          });
        });
      }
    },
  },
});
</script>

<style scoped>
.question-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
}
.question-wrapper > label {
  flex: 1;
  max-width: 300px;
  border-right: 1px solid #393939;
  padding: 10px 0;
}
.question-wrapper > div {
  flex: 2;
  padding: 10px 20px;
}
</style>
