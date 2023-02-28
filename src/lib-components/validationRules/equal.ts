import Validator from '../models/Validator';

export const equal = (...args: [string]) => {
  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [equal] = args;

  return [
    {
      fact: 'response',
      operator: 'equal',
      value: Validator.validationRuleValue(equal, {}),
    },
  ];
};
