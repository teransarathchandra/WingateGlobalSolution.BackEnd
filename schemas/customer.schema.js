const Joi = require('joi');

const { regExp } = require('../constants');

const nameSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).regex(regExp.name),
  lastName: Joi.string().min(2).max(255).regex(regExp.name)
});

const addressSchema = Joi.object({
  street: Joi.string().max(50).min(5),
  city: Joi.string().max(50).min(5),
  state: Joi.string().max(50).min(5),
  country: Joi.string().max(50).min(2)
});

const registerSchema = Joi.object({
  name: nameSchema,
  email: Joi.string().email(),
  contactNumber: Joi.number().integer(),
  address: addressSchema,
  customerId: Joi.string(),
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority'),
  birthday: Joi.date(),
  password: Joi.string().min(8).max(100), 
});

const updateSchema = Joi.object({
  name: nameSchema,
  email: Joi.string().email(),
  contactNumber: Joi.number().integer(),
  address: addressSchema,
  customerId: Joi.string(),
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority'),
  birthday: Joi.date(),
});

module.exports = { registerSchema, updateSchema };
