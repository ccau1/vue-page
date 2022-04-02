import { Engine, NestedCondition } from "json-rules-engine";
import { Widget } from ".";

export const validateResponse = async ({
  validates,
  data,
}: {
  validates: NestedCondition[];
  data: { [key: string]: any };
}): Promise<boolean> => {
  // instantiate engine for rule checking
  const engine = new Engine();
  // add validate rules to engine
  engine.addRule({
    conditions: { all: validates },
    event: {
      type: "isValid",
    },
  });
  // run the validation
  const result = await engine.run(data);

  // return whether it is valid
  return result.events.some((e) => e.type === "isValid");
};

export const validateWidget = async ({
  widget,
  response,
}: {
  widget: Widget;
  response: any;
}): Promise<string[]> => {
  const validationResults = await Promise.all(
    (widget.validations || []).map((validation) => {
      return validateResponse({
        validates: validation.conditions,
        data: { response },
      });
    })
  );

  const errors = validationResults.reduce<string[]>(
    (arr, isValid, validationIndex) => {
      if (isValid) return arr;
      widget.validations && arr.push(widget.validations[validationIndex].error);
      return arr;
    },
    []
  );

  return errors;
};
