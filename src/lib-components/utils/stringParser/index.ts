import { Command, StringParserOptions } from './interfaces';

import { parserCommands } from './commands';

/**
 * split a string by a delimiter while respecting brackets and only
 * split root delimiters
 *
 * @param delimiter {string} string to separate them by
 * @returns {string[]} array of string
 */
export let splitRootRegex = (delimiter: string) => {
  return new RegExp(`${delimiter}(?![^\\(]*\\))`, 'g');
};

/**
 * parse a string with commands and variable getters
 *
 * @param cmd {string} command string
 * @param variables {Object} a key-value object for cmd to access
 * @returns {string | Date | number | boolean} result of cmd parsing
 */
export let stringParser = (
  cmd: string,
  variables: { [fieldCodeOrId: string]: any },
  options?: StringParserOptions
) => {
  const commands = options?.commands || parserCommands;
  // if it is not a string, there's nothing to parse, just return it
  if (typeof cmd !== 'string') {
    return cmd;
  }
  // split command by "&" and handle each command part
  // then merge concat them back together
  const result = cmd
    .replace(/^=/, '')
    .split(splitRootRegex(`\\s*&\\s*`))
    .map((splitCmd) => {
      let parserCommand: Command | null = null;
      let regexMatched: string[] | null = null;
      let isFound = false;

      // find command by key
      if (commands[splitCmd.replace(/\(.*$/, '')]) {
        parserCommand = commands[splitCmd.replace(/\(.*$/, '')];
        regexMatched = parserCommand.regex
          ? splitCmd.match(parserCommand.regex)
          : null;
        if (regexMatched || !parserCommand.regex) {
          // if regex has no match OR command doesn't have regex
          isFound = true;
        }
      }

      // find command by regex
      if (!isFound) {
        for (const [_cmdKey, _parserCommand] of Object.entries(commands)) {
          regexMatched = _parserCommand.regex
            ? splitCmd.match(_parserCommand.regex)
            : null;
          if (regexMatched) {
            parserCommand = _parserCommand;
            isFound = true;
            break;
          }
        }
      }

      // if no command found, just return string as is
      // if command found, parse and return result
      return isFound && parserCommand
        ? parserCommand.parse(
            splitCmd,
            variables,
            (regexMatched || []).slice(1),
            options
          )
        : splitCmd;
    });

  // if result only has one (no &), do not join because it'll make
  // the result into a string. If it has &, then join them
  return result.length > 1 ? result.join('') : result[0];
};
