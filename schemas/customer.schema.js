const Joi = require('joi');

const { regExp } = require('../constants');

const nameSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(255).regex(regExp.name),
  lastName: Joi.string().required().min(2).max(255).regex(regExp.name)
});

const addressSchema = Joi.object({
  street: Joi.string().required().max(50).min(5),
  city: Joi.string().required().max(50).min(5),
  state: Joi.string().required().max(50).min(5),
  country: Joi.string().required().max(50).min(2)
});

const registerSchema = Joi.object({
  name: nameSchema,
  email: Joi.string().email().required(),
  contactNumber: Joi.number().required().integer(),
  address: addressSchema,
  customerId: Joi.string().required(),
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
  birthday: Joi.date(),
  password: Joi.string().min(8).max(100), // Adding password validation without the required flag
});

const updateSchema = Joi.object({
  name: nameSchema,
  email: Joi.string().email(),
  contactNumber: Joi.number().integer(),
  address: addressSchema,
  customerId: Joi.string().required(),
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
  birthday: Joi.date(),
});

module.exports = { registerSchema, updateSchema };
