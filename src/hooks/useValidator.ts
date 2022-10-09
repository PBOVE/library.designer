import type { Rules, Values, ValidateError, ValidateFieldsError, ValidateOption } from 'async-validator';
import Schema from 'async-validator';

type Errors = ValidateError[];

type Fields = ValidateFieldsError | Values;

type Result = [{ errors: Errors; fields: Fields }, false] | [undefined, true];

export const useValidator = (descriptor: Rules) => {
  const validator = new Schema(descriptor);

  return (source: Values, options: ValidateOption): Promise<Result> => {
    return new Promise((resolve) => {
      validator.validate(source, options, (errors: Errors, fields: Fields) => {
        errors ? resolve([{ errors, fields }, false]) : resolve([undefined, true]);
      });
    });
  };
};
