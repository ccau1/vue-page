import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const MIN: Command = {
  regex: /^MIN\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    let min: number | string = Infinity;
    for (const subCmd of (matchParts[0] || '').split(
      splitRootRegex(`\\s*,\\s*`)
    )) {
      const result = stringParser(subCmd, variables, options);
      if (typeof result === 'number') {
        if (result < (min as number)) min = result;
      } else if (typeof result === 'string') {
        if (result.localeCompare(min as string) < 0) {
          min = result;
        }
      }
    }
    return min;
  },
};
