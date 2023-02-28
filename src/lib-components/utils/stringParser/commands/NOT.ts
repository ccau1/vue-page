import { Command, CommandVariables, StringParserOptions } from '../interfaces';

import { stringParser } from '..';

export const NOT: Command = {
  regex: /^NOT\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    return !stringParser(matchParts[0], variables, options);
  },
};
