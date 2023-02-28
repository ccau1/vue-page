import { PageConfigValidations } from '../interfaces';

export default (...args: PageConfigValidations[]): PageConfigValidations =>
  args.reduce(
    (validations, arg) => {
      Object.keys(arg.rules || {}).forEach((rule) => {
        if (validations.rules?.[rule]) {
          console.warn(
            `validation rule [${rule}] has been defined more than once`
          );
        }
      });
      Object.keys(arg.facts || {}).forEach((fact) => {
        if (validations.facts?.[fact]) {
          console.warn(
            `validation fact [${fact}] has been defined more than once`
          );
        }
      });

      return {
        rules: {
          ...validations.rules,
          ...arg.rules,
        },
        facts: {
          ...validations.facts,
          ...arg.facts,
        },
      };
    },
    { rules: {}, facts: {} }
  );
