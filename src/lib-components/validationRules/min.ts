import Validator from '../models/Validator';

export const min = (...args: [number]) => {
  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [min] = args;

  return [
    {
      fact: 'response',
      operator: 'greaterThanInclusive',
      value: Validator.validationRuleValue(min, {}),
    },
  ];
};
