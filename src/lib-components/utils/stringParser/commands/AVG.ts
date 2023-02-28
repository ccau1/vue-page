import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const AVG: Command = {
  regex: /^AVG\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length === 0) {
      throw new Error('AVG() requires 1 or more parameters, received 0');
    }

    return (
      subParts.reduce(
        (sum, num) => sum + parseFloat(stringParser(num, variables, options)),
        0
      ) / subParts.length
    );
  },
};
