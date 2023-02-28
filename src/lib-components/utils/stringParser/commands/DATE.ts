import { Command, CommandVariables } from '../interfaces';

import { getDateByPropertyValue } from '@/entry.esm';

export const DATE: Command = {
  regex: /^(Date.now|new Date|dayjs)/,
  parse: (
    cmd: string,
    variables: CommandVariables
  ): Date | number | undefined => getDateByPropertyValue(cmd, variables),
};
