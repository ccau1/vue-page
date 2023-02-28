import {
  AllConditions,
  AnyConditions,
  ConditionProperties,
  Engine,
  EngineResult,
  NestedCondition,
} from 'json-rules-engine';
import {
  FormValidationAllConditions,
  FormValidationAnyConditions,
  FormValidationCondition,
  PageConfigValidations,
  RuleEngineRuleDefinitions,
  ValidationRules,
} from '../interfaces';
import { formatDateString, getDateByPropertyValue } from '../utils';

import validationRules from '../validationRules';

export const CMD_DATE_REGEX = /^(Date.now|new Date|dayjs)/;

type VALIDATE_RULE_VALUE_RETURN = string | Date | number | boolean;

export default class Validator {
  protected _presetValidations: PageConfigValidations = {};

  get rules(): RuleEngineRuleDefinitions {
    return this._presetValidations.rules || {};
  }

  static getRuleConditions(
    rule: FormValidationCondition | FormValidationCondition[] | string,
    facts: { [key: string]: any },
    commands?: RuleEngineRuleDefinitions
  ): NestedCondition[] {
    return (Array.isArray(rule) ? rule : [rule]).reduce<NestedCondition[]>(
      (arr, cond) => {
        if (typeof cond === 'string') {
          const matched = cond.match(/^([^\(]+)(\((.*)\))*/);
          if (!matched) {
            throw new Error(`rule [${cond}] has incorrect format`);
          }
          const [_original, command, _paramsWithBrackets, params] = matched;

          if (!commands?.[command]) {
            throw new Error(
              `rule [${cond}] does not exist in predefined rules`
            );
          }

          if (params && typeof commands?.[command] !== 'function') {
            throw new Error(
              `rule [${cond}] expects ${command} to be a function but is not`
            );
          }

          try {
            return [
              ...arr,
              ...(params
                ? typeof commands?.[command] === 'function'
                  ? (commands?.[command] as Function)?.(
                      ...(params || '').split(/\s*,\s*/)
                    )
                  : commands?.[command]
                : commands?.[command] || []),
            ];
          } catch (err) {
            throw new Error(`rule [${command}] ${(err as Error).message}`);
          }
        } else if ((cond as FormValidationAllConditions).all?.length) {
          return [
            ...arr,
            {
              all: Validator.getRuleConditions(
                (cond as FormValidationAllConditions).all,
                facts,
                commands
              ),
            },
          ];
        } else if ((cond as FormValidationAnyConditions).any?.length) {
          return [
            ...arr,
            {
              any: Validator.getRuleConditions(
                (cond as FormValidationAnyConditions).any,
                facts,
                commands
              ),
            },
          ];
        } else {
          return [
            ...arr,
            {
              ...cond,
              value: Validator.validationRuleValue(
                (cond as ConditionProperties).value,
                facts
              ),
            } as NestedCondition,
          ];
        }
      },
      []
    );
  }

  static getRuleFacts(
    rule: FormValidationCondition | FormValidationCondition[] | string,
    facts: { [key: string]: any }
  ): string[] {
    // define conditions from rule. rule can be:
    //  - FormValidationCondition
    //  - string that maps to rules from config
    let conditions: Array<FormValidationCondition> =
      Validator.getRuleConditions(rule, facts);

    // with each condition, extract facts into a
    // final array
    return (conditions || [])?.reduce<string[]>((_arr, c) => {
      if ((c as AllConditions).all?.length) {
        // it is a AllConditions
        return [..._arr, ...this.getRuleFacts((c as AllConditions).all, facts)];
      } else if ((c as AnyConditions).any?.length) {
        // it is a AnyConditions
        return [..._arr, ...this.getRuleFacts((c as AnyConditions).any, facts)];
      } else {
        // default to ConditionProperties
        return [
          ..._arr,
          (c as ConditionProperties).fact,
          ...((c as ConditionProperties).value?.fact
            ? [(c as ConditionProperties).value.fact]
            : []),
        ];
      }
    }, []);
  }

  static validationRuleValue(
    value: string | number | boolean | { fact: string },
    facts: { [key: string]: any }
  ): VALIDATE_RULE_VALUE_RETURN | { fact: VALIDATE_RULE_VALUE_RETURN } {
    if (!value) return value;

    const isFact = /^\$/.test(value.toString());

    if (isFact) {
      return { fact: value.toString().replace(/^$/, '') };
    }

    if ((value as { fact: string }).fact) {
      return {
        fact: Validator.validationRuleValue(
          (value as { fact: string }).fact,
          facts
        ),
      } as { fact: VALIDATE_RULE_VALUE_RETURN };
    }

    if (CMD_DATE_REGEX.test(value.toString())) {
      return getDateByPropertyValue(value.toString(), facts) as Date;
    }

    if (value === 'false') {
      return false;
    } else if (value === 'true') {
      return true;
    } else if (!isNaN(parseFloat(value.toString()))) {
      return parseFloat(value.toString());
    }

    return value;
  }

  static sanitizeFacts(facts: { [key: string]: any }) {
    return Object.keys(facts).reduce<{ [key: string]: any }>(
      (newObj, factKey) => {
        if (facts[factKey] === undefined || facts[factKey] === '') {
          newObj[factKey] = null;
        } else if (
          /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(facts[factKey]) ||
          facts[factKey] instanceof Date
        ) {
          newObj[factKey] = new Date(facts[factKey]).valueOf();
          if (isNaN(newObj[factKey])) {
            newObj[factKey] = null;
          }
        } else if (Array.isArray(facts[factKey])) {
          newObj[factKey] = facts[factKey].map((f: { [key: string]: any }) =>
            this.sanitizeFacts(f)
          );
        } else if (facts[factKey] instanceof Object) {
          newObj[factKey] = this.sanitizeFacts(facts[factKey]);
        } else if (CMD_DATE_REGEX.test(facts[factKey])) {
          newObj[factKey] = getDateByPropertyValue(facts[factKey], facts);
        } else {
          newObj[factKey] = facts[factKey];
        }

        return newObj;
      },
      {}
    );
  }

  static generateValidateGenericData = async () => {
    return {
      'Date.now': Date.now(),
      currentDate: new Date(),
      currentDateString: formatDateString(new Date()),
    };
  };

  constructor(presetValidations?: PageConfigValidations) {
    // TODO: should just pass config.validations?
    // is this reactive? or need to recreate class
    // with new config to be reactive???
    // use fn getConfig() instead??
    this.setPresetValidations(presetValidations || {});
  }

  getRuleConditions(
    rule: FormValidationCondition | FormValidationCondition[] | string,
    facts: { [key: string]: any }
  ): NestedCondition[] {
    return Validator.getRuleConditions(
      rule,
      facts,
      this._presetValidations.rules
    );
  }

  getRuleFacts(
    rule: FormValidationCondition | FormValidationCondition[] | string,
    facts: { [key: string]: any }
  ): string[] {
    return Validator.getRuleFacts(rule, facts);
  }

  validationRuleValue(
    value: string | number | boolean | { fact: string },
    facts: { [key: string]: any }
  ) {
    return Validator.validationRuleValue(value, facts);
  }

  setPresetValidations = (presetValidations: PageConfigValidations) => {
    this._presetValidations = {
      // FIXME: all validation deps mixed together
      deps: presetValidations.deps,
      rules: {
        ...validationRules,
        ...presetValidations.rules,
      },
      facts: {
        ...presetValidations.facts,
      },
    };
  };

  sanitizeFacts(facts: { [key: string]: any }) {
    return Validator.sanitizeFacts(facts);
  }

  generateValidateGenericData() {
    return Validator.generateValidateGenericData();
  }

  getRuleEngine = () => {
    const validations = this._presetValidations || {};
    const ruleEngine = new Engine(undefined, { allowUndefinedFacts: true });
    if (validations.facts && Object.keys(validations.facts).length) {
      Object.keys(validations.facts).forEach((factKey) => {
        ruleEngine.addFact(factKey, validations.facts?.[factKey]);
      });
    }

    return ruleEngine;
  };

  async validateMultiple(
    conditions: ValidationRules,
    facts: { [key: string]: any }
  ): Promise<string[]> {
    const engine = this.getRuleEngine();

    const genericData = await Validator.generateValidateGenericData();

    const sanitizedFacts = Validator.sanitizeFacts({
      ...facts,
      ...genericData,
    });

    conditions.forEach((c) => {
      const validateConditions = Validator.getRuleConditions(
        c.conditions,
        sanitizedFacts
      );
      engine.addRule({
        conditions: {
          all: validateConditions,
        },
        event: {
          type: c.error,
        },
      });
    });

    return (await engine.run(sanitizedFacts)).failureEvents.map((e) => e.type);
  }

  async validate(
    conditions: FormValidationCondition[],
    facts: { [key: string]: any }
  ): Promise<boolean> {
    const genericData = await Validator.generateValidateGenericData();

    const sanitizedFacts = Validator.sanitizeFacts({
      ...facts,
      ...genericData,
    });

    const engine = this.getRuleEngine();
    const validateConditions = Validator.getRuleConditions(
      conditions,
      sanitizedFacts
    );
    engine.addRule({
      conditions: {
        all: validateConditions,
      },
      event: {
        type: 'isTruthy',
      },
    });

    const result = (await engine.run(sanitizedFacts)) as EngineResult;

    return result.events.some((e) => e.type === 'isTruthy');
  }
}
