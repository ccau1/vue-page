export type CommandVariables = { [fieldCodeOrId: string]: any };

export interface Command {
  regex?: RegExp;
  parse: (
    cmd: string,
    variables: CommandVariables,
    matched: string[],
    options?: StringParserOptions
  ) => any;
}

export interface StringParserOptions {
  commands?: { [commandKey: string]: Command };
}
