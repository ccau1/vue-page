import { Command, CommandVariables, StringParserOptions } from '../interfaces';

import { stringParser } from '..';

export const VARIABLE: Command = {
  regex: /^\$(.*)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matched: string[],
    options?: StringParserOptions
  ): any => {
    return /^\$\(/.test(matched[0])
      ? variables[
          stringParser(
            matched[0].replace(/^\$\((.*)\)$/, '$1'),
            variables,
            options
          )
        ]
      : variables[matched[0]];
  },
};
