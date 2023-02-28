import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const ABS: Command = {
  regex: /^ABS\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(
        `ABS() requires 1 parameter, received ${subParts.length}`
      );
    }

    return Math.abs(parseFloat(stringParser(subParts[0], variables, options)));
  },
};
