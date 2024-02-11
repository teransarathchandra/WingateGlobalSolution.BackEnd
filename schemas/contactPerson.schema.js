const Joi = require('joi');

const registerSchema = Joi.object({
  customerId: Joi.string().required(),
  contactPerson: Joi.string().required().max(50),
  contactNumber: Joi.number().required().integer(),
  email: Joi.string().required()
});

const updateSchema = Joi.object({
  contactPerson: Joi.string().required().max(50),
  contactNumber: Joi.number().required().integer(),
  email: Joi.string().required()
});

module.exports = { registerSchema, updateSchema };
