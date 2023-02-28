import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const IF: Command = {
  regex: /^IF\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 3) {
      throw new Error('IF() requires 3 parameters');
    }

    const [isTrue, trueResult, falseResult] = subParts;

    return stringParser(
      stringParser(isTrue, variables, options)
        ? stringParser(trueResult, variables, options)
        : stringParser(falseResult, variables, options),
      variables,
      options
    );
  },
};
