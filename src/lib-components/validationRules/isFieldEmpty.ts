export const isFieldEmpty = (...args: string[]) => {
  if (args.length === 0) {
    throw new Error(`requires 1 or more arguments, received ${args.length}`);
  }

  return args.map((field) => ({
    fact: field,
    operator: 'equal',
    value: null,
  }));
};
