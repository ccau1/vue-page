import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const AND: Command = {
  regex: /^AND\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): boolean => {
    const parts = matchParts[0].split(splitRootRegex(`\\s*,\\s*`)) || [];

    if (!parts.length) {
      throw new Error(
        `AND() requires 1 or more parameters, received ${parts.length}`
      );
    }

    return parts.every((p) => stringParser(p, variables, options));
  },
};
