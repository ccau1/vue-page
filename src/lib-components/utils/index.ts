import { TranslateData, TranslateKey } from '../interfaces';

import dayjs from 'dayjs';

export * from './stringParser';

export { default as combineValidations } from './combineValidations';

export let flatten = <T = any>(
  arr: Array<T | T[]>,
  opts?: { deep?: boolean }
): T[] => {
  return arr.reduce<T[]>((_arr, item) => {
    if (opts?.deep) {
      const newList = Array.isArray(item) ? item : [item];
      return [
        ..._arr,
        ...(newList.some((i) => Array.isArray(i)) ? flatten(newList) : newList),
      ];
    }

    return [..._arr, ...(Array.isArray(item) ? item : [item])];
  }, []);
};

const cachedArgs: { [key: string]: { cached: any[]; result: any } } = {};

export let cachedMerge = (
  key: string,
  ...args: Array<Object | Record<string, unknown> | Array<any> | undefined>
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

export let flattenTranslateKey = (input: TranslateKey): string[] => {
  if (Array.isArray(input)) {
    return (input as TranslateKey[]).reduce<string[]>(
      (arr, i: string | TranslateKey) => {
        if (Array.isArray(i)) {
          return [...arr, ...flattenTranslateKey(i)];
        } else {
          return [...arr, i];
        }
      },
      []
    );
  } else {
    // it is a string, break it up now
    return input.split('.');
  }
};

interface LanguageSet {
  [key: string]: string | LanguageSet;
}

export let translate = (
  languages: LanguageSet,
  key: TranslateKey,
  data?: TranslateData
): string => {
  const lang = flattenTranslateKey(key).reduce<TranslateData | string>(
    (obj, g) => {
      if (typeof obj === 'string') {
        return obj;
      }
      return obj?.[g] || obj?.[`control_${g}`];
    },
    languages
  ) as string;

  return lang?.replace(
    /(\{(\w+)\})/g,
    (_orig: string, outer: string, inner: string) =>
      (data || {})[inner] || outer
  );
};

export let formatDateString = (date?: Date | string): string | undefined => {
  if (!date) return undefined;
  return new Date(date).toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * generate a date (or number) based on the string method passed into
 * the date param
 *
 * dayjs($startDate).add(2, 'day') = a date that is 2 days after startDate
 * dayjs().diff($startDate, 'day') = day count (number) from startDate to now
 *
 * @param date the string or date to render
 * @param variables object of variables used to substitute $variable
 * @returns a date or number
 */
export let getDateByPropertyValue = (
  date?: string | Date,
  variables?: { [fieldCodeOrId: string]: any } | string
): Date | number | undefined => {
  if (!date) {
    return undefined;
  }
  if (date instanceof Date) {
    return date;
  }
  const parsedDate = Date.parse(date);
  if (!isNaN(parsedDate)) {
    // is a proper date timestamp, return date with it
    return new Date(parsedDate);
  }

  if (/^Date.now(\(\))*$/.test(date) || /^new Date(\(\))*$/.test(date)) {
    // if date string is Date.now or new Date, return current date
    return new Date();
  }

  if (/(^dayjs|^[\w]+\([^\)]*\))/.test(date)) {
    // if it is a dayjs handling, run it through dayjs
    // examples:
    // - subtract(1, 'month') (based on current date)
    // - dayjs($incidentDate).subtract(1, 'day')
    const dateResult: dayjs.Dayjs | number = date
      .split('.')
      .reduce<dayjs.Dayjs | number>((accDate, part) => {
        const parts = part.match(/([\w]+)\(([^\)]*)\)/);
        // if part doesn't match needed format, just short circuit return
        if (!parts) return accDate;
        switch (parts[1]) {
          case 'dayjs':
            // if command is dayjs, replace current dayjs instance
            // with this dayjs (to define specific date)
            if (parts[2]) {
              if (/^\$/.test(parts[2])) {
                const responseResult = parts[2]
                  .replace(/^\$/, '')
                  .split('.')
                  .reduce((response, part) => {
                    return (response as { [fieldCodeOrId: string]: any })[part];
                  }, variables || {});
                return dayjs(responseResult as string);
              } else {
                return dayjs(parts[2]);
              }
            }
            return accDate;
          default:
            return (accDate as any)[parts[1]](
              ...parts[2].split(/\s*,\s*/).map((a) => {
                const parsedNum = parseFloat(a);
                if (isNaN(parsedNum)) {
                  if (/^\$/.test(a)) {
                    // starts with a $, it is looking for a variable
                    return a
                      .replace(/^\$/, '')
                      .split('.')
                      .reduce((response, part) => {
                        return (response as { [fieldCodeOrId: string]: any })[
                          part
                        ];
                      }, variables || {});
                  }
                  // else just return sanitised text back
                  return a.replaceAll(/[\'\"]+/g, '');
                } else {
                  return parsedNum;
                }
              })
            );
        }
      }, dayjs());

    // if date result is a dayjs, return the Date version of it,
    // else return it as is
    return dateResult instanceof dayjs
      ? (dateResult as dayjs.Dayjs).toDate()
      : (dateResult as number);
  } else if (/^\$/.test(date)) {
    // if date field is a variable (ie. $incidentDate), we'll fetch this
    // field from variables
    const responseResult = date
      .replace(/^\$/, '')
      .split('.')
      .reduce((response, part) => {
        return (response as { [fieldCodeOrId: string]: any })[part];
      }, variables || {});
    // return date instance of drilled down field
    return new Date(responseResult as string);
  }

  return undefined;
};
