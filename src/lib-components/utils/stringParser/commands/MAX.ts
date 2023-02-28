import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const MAX: Command = {
  regex: /^MAX\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    let max: number | string = -Infinity;
    for (const subCmd of (matchParts[0] || '').split(
      splitRootRegex(`\\s*,\\s*`)
    )) {
      const result = stringParser(subCmd, variables, options);
      if (typeof result === 'number') {
        if (result > (max as number)) max = result;
      } else if (typeof result === 'string') {
        if (result.localeCompare(max as string) > 0) {
          max = result;
        }
      }
    }
    return max;
  },
};
