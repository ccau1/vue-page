import Validator from '../models/Validator';

export const max = (...args: [number]) => {
  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [max] = args;

  return [
    {
      fact: 'response',
      operator: 'lessThanInclusive',
      value: Validator.validationRuleValue(max, {}),
    },
  ];
};
