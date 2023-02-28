import { type Command } from '../interfaces';
import { ABS } from './ABS';
import { AND } from './AND';
import { AVG } from './AVG';
import { DATE } from './DATE';
import { IF } from './IF';
import { IFNA } from './IFNA';
import { LOWER } from './LOWER';
import { MAX } from './MAX';
import { MIN } from './MIN';
import { NOT } from './NOT';
import { OR } from './OR';
import { SUM } from './SUM';
import { UPPER } from './UPPER';
import { VARIABLE } from './VARIABLE';
import { TRIM } from './TRIM';

export const parserCommands: { [key: string]: Command } = {
  ABS,
  AND,
  AVG,
  DATE,
  IF,
  IFNA,
  LOWER,
  MAX,
  MIN,
  NOT,
  OR,
  SUM,
  UPPER,
  TRIM,
  VARIABLE,
};
