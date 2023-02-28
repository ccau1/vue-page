import { Command, CommandVariables, StringParserOptions } from '../interfaces';
import { splitRootRegex, stringParser } from '..';

export const LOWER: Command = {
  regex: /^LOWER\((.*)\)$/,
  parse: (
    _cmd: string,
    variables: CommandVariables,
    matchParts: string[] = [],
    options?: StringParserOptions
  ): any => {
    const subParts = (matchParts[0] || '').split(splitRootRegex(`\\s*,\\s*`));

    if (subParts.length !== 1) {
      throw new Error(
        `LOWER() requires 1 parameter, received ${subParts.length}`
      );
    }

    return (
      stringParser(subParts[0], variables, options) as string
    ).toLowerCase();
  },
};
