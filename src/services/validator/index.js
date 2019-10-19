import validator from 'lx-valid';
import * as schemas from './schemas';

const validate = (object, schema, options) => {
    const fn = options && options.isUpdate
        ? validator.getValidationFunction()
        : validator.validate;
    const result = fn(
        object,
        schema,
        Object.assign({cast: true}, options || {}),
    );

  return { isValid: result.valid, errors: result.errors}
};

export default validate;
export {
  schemas
};
