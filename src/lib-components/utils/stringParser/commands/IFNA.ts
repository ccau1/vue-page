import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const IFNA: Command = {
  regex: /^IFNA\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    for (const subCmd of (matchParts[0] || '').split(
      splitRootRegex(`\\s*,\\s*`)
    )) {
      const result = stringParser(subCmd, variables, options);
      if (result) {
        return result;
      }
    }
  },
};
