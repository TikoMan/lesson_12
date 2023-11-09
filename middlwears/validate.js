import _ from 'lodash';
import HttpError from 'http-errors';

const validate = (schema, path = 'body') => async (req, res, next) => {
  try {
    req[path] = await schema.validateAsync(req[path], {
      abortEarly: false,
      dateFormat: 'iso',
    });

    next();
  } catch (e) {
    const errors = {};
    e.details.forEach((el) => {
      _.set(errors, el.path, el.message);
    });
    next(HttpError(422, { errors }));
  }
};

export default validate;
