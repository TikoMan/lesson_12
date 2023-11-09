import Joi from 'joi';

export default {
  create: Joi.object({
    firstName: Joi.string().trim().max(255).required(),
    lastName: Joi.string().trim().max(255).required(),
    email: Joi.string().trim().email().required()
      .max(255),
    password: Joi.string().trim().required().max(32),
    token: Joi.string().trim().required(),
  }),
  auth: Joi.object({
    firstName: Joi.string().trim().max(255).required(),
    lastName: Joi.string().trim().max(255).required(),
    email: Joi.string().trim().email().required()
      .max(255),
  }),
  list: Joi.object({
    limit: Joi.number().min(1).max(100),
    page: Joi.number().min(1),
    s: Joi.string().trim(),
  }),
};
