import { WidgetControl } from "../..";
import Display from "./WidgetDisplay.vue";
import Form from "./WidgetForm.vue";
import { Engine, ConditionProperties } from "json-rules-engine";

export interface PagingData {}

export default {
  display: Display,
  form: Form,
  handleReflexives({ widget, widgetId, formState, setFormState }) {
    if (!widget.reflexives?.length) {
      return;
    }

    const engine = new Engine();
    engine.addRule({
      conditions: {
        any: [
          {
            all: widget.reflexives,
          },
        ],
      },
      event: {
        type: "isReflexive",
      },
    });

    engine
      .run(
        widget.reflexives.reduce<{ [widgetCode: string]: any }>(
          (obj, reflexive) => {
            const widgetState = formState.widgetState;
            const widgetIdByCode = (
              widgetState.__questionsCodeWidgetIdMap as any
            )[(reflexive as ConditionProperties).fact];

            const response = (widgetState[widgetIdByCode] as any)?.response;

            obj[(reflexive as ConditionProperties).fact] = response;
            return obj;
          },
          {}
        )
      )
      .then(({ events }) => {
        if (!formState.widgetState[widgetId])
          formState.widgetState[widgetId] = {};
        (formState.widgetState[widgetId] as any).reflexiveHide = events.every(
          (e) => e.type !== "isReflexive"
        );
        setFormState(formState);
      });
  },
} as WidgetControl<PagingData>;
