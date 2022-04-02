import { FormWidgets, Widget, WidgetControls } from ".";
import { FormState } from "./models/FormState";
import { Engine, ConditionProperties } from "json-rules-engine";
import { registerWidgetCode, unregisterWidgetCode } from "./utils";

export const registerReflexives = async ({
  widget,
  formState,
  setFormState,
}: {
  widget: Widget;
  formState: FormState;
  setFormState?: (newFormState: FormState) => void;
}) => {
  let _formState = new FormState(formState);
  _formState = registerWidgetCode({
    formState: _formState,
    widget,
    setFormState,
  });

  if (widget.reflexives?.length) {
    if (!_formState.widgetState.__qReflexiveWatch) {
      _formState.widgetState.__qReflexiveWatch = {};
    }

    widget.reflexives.map((reflexive) => {
      if (
        !_formState.widgetState.__qReflexiveWatch[
          (reflexive as ConditionProperties).fact
        ]
      ) {
        _formState.widgetState.__qReflexiveWatch[
          (reflexive as ConditionProperties).fact
        ] = [];
      }
      _formState.widgetState.__qReflexiveWatch[
        (reflexive as ConditionProperties).fact
      ] = [
        ...new Set([
          ..._formState.widgetState.__qReflexiveWatch[
            (reflexive as ConditionProperties).fact
          ],
          widget.id,
        ]),
      ];
    });

    // call initial reflexive checking
    handleReflexives({
      widget,
      formState: _formState,
      setFormState,
    });
  }

  return _formState;
};

export const unregisterReflexives = ({
  formState,
  widget,
  setFormState,
}: {
  formState: FormState;
  widget: Widget;
  setFormState?: (newFormState: FormState) => void;
}) => {
  // remove code from questions mapper
  widget.code && unregisterWidgetCode({ formState, widgetCode: widget.code });

  if (widget.reflexives?.length) {
    widget.reflexives.forEach((reflexive) => {
      const reflexiveWatchListIndex = (
        formState.widgetState.__qReflexiveWatch[
          (reflexive as ConditionProperties).fact
        ] || []
      ).findIndex((f: string) => f === widget.id);

      if (reflexiveWatchListIndex > -1) {
        formState.widgetState.__qReflexiveWatch[
          (reflexive as ConditionProperties).fact
        ].splice(reflexiveWatchListIndex, 1);
      }
    });
    setFormState?.(formState);
  }
};

export const handleReflexivesByWidgetIds = (
  widgetIdsToHandle: string[],
  {
    formWidgets,
    formState,
    setFormState,
  }: {
    formWidgets: FormWidgets;
    formState: FormState;
    setFormState?: (newFormState: FormState) => void;
  }
) => {
  if (widgetIdsToHandle?.length) {
    widgetIdsToHandle.forEach((widgetId) => {
      const widgetToCheckReflexive = formWidgets[widgetId];
      handleReflexives?.({
        widget: widgetToCheckReflexive,
        formState,
        setFormState,
      });
    });
  }
};

export const handleReflexives = ({
  widget,
  formState,
  setFormState,
}: {
  widget: Widget;
  formState: FormState;
  setFormState?: (newFormState: FormState) => void;
}): Promise<FormState | null> => {
  return new Promise((resolve, reject) => {
    if (!widget.reflexives?.length) {
      return null;
    }

    const engine = new Engine();
    engine.addRule({
      conditions: {
        all: widget.reflexives,
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

            // TODO: what if I want to be more generic
            // and run rule by any param in widgetState and data
            const response = (widgetState[widgetIdByCode] as any)?.response;

            obj[(reflexive as ConditionProperties).fact] = response;
            return obj;
          },
          {}
        )
      )
      .then(({ events }) => {
        if (!formState.widgetState[widget.id])
          formState.widgetState[widget.id] = {};
        (formState.widgetState[widget.id] as any).reflexiveHide = events.every(
          (e) => e.type !== "isReflexive"
        );
        setFormState?.(formState);
        resolve(formState);
      });
  });
};
