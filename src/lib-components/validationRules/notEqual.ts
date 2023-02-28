import Validator from '../models/Validator';

export const notEqual = (...args: [string]) => {
  if (args.length !== 1) {
    throw new Error(`requires 1 argument, received ${args.length}`);
  }

  const [notEqual] = args;

  return [
    {
      fact: 'response',
      operator: 'notEqual',
      value: Validator.validationRuleValue(notEqual, {}),
    },
  ];
};
