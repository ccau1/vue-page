const cachedArgs: { [key: string]: { cached: any[]; result: any } } = {};

export const cachedMerge = (
  key: string,
  ...args: Array<Object | Array<any> | undefined>
) => {
  if (!cachedArgs[key]) cachedArgs[key] = { cached: [], result: null };
  if (!args.length) return null;
  if (
    args.length !== cachedArgs[key].cached.length ||
    args.some((a, aIndex) => a !== cachedArgs[key].cached[aIndex])
  ) {
    cachedArgs[key].cached = args;
    // cached not matched, update cache args and result
    if (Array.isArray(args[0])) {
      cachedArgs[key].result = args.reduce<any[]>(
        (arr, arg) => [...arr, ...(arg as any[])],
        []
      );
    } else {
      cachedArgs[key].result = args.reduce<{ [key: string]: any }>(
        (obj, argObj) => ({ ...obj, ...argObj }),
        {}
      );
    }
  }

  return cachedArgs[key].result;
};
