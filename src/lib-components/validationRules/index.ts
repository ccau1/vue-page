import { RuleEngineRuleDefinitions } from '../interfaces';
import { equal } from './equal';
import { inRange } from './inRange';
import { isEmpty } from './isEmpty';
import { isFalse } from './isFalse';
import { isFieldEmpty } from './isFieldEmpty';
import { isTrue } from './isTrue';
import { max } from './max';
import { min } from './min';
import { notEqual } from './notEqual';
import { positiveNumber } from './positiveNumber';
import { required } from './required';

export default {
  equal,
  inRange,
  isEmpty,
  isFieldEmpty,
  isFalse,
  isTrue,
  max,
  min,
  notEqual,
  positiveNumber,
  required,
} as RuleEngineRuleDefinitions;
