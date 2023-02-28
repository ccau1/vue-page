import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const SUM: Command = {
  regex: /^SUM\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length === 0) {
      throw new Error('SUM() requires 1 or more parameters');
    }

    return subParts.reduce(
      (sum, num) => sum + parseFloat(stringParser(num, variables, options)),
      0
    );
  },
};
