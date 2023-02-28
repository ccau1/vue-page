import Validator from '../models/Validator';

export const inRange = (...args: [number, number]) => {
  if (args.length !== 2) {
    throw new Error(`require 2 arguments, received ${args.length}`);
  }

  const [from, to] = args;

  return [
    {
      fact: 'response',
      operator: 'greaterThanInclusive',
      value: Validator.validationRuleValue(from, {}),
    },
    {
      fact: 'response',
      operator: 'lessThanInclusive',
      value: Validator.validationRuleValue(to, {}),
    },
  ];
};
