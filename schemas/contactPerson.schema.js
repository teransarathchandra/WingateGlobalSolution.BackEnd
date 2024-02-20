const Joi = require('joi');

const registerSchema = Joi.object({
  contactPersonId:Joi.string(),
  customerId: Joi.string().required(),
  contactPerson: Joi.string().required().max(50),
  contactNumber: Joi.number().required().integer(),
  email: Joi.string().required()
});

const updateSchema = Joi.object({
  customerId: Joi.string(),
  contactPerson: Joi.string().max(50),
  contactNumber: Joi.number().integer(),
  email: Joi.string()
});

module.exports = { registerSchema, updateSchema };
