const Joi = require("joi");
const { regExp } = require('../constants');

const nameSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(255).regex(regExp.name),
  lastName: Joi.string().required().min(2).max(255).regex(regExp.name)
});

const addressSchema = Joi.object({
  street: Joi.string().required().max(50).min(5),
  city: Joi.string().required().max(50).min(5),
  state: Joi.string().required().max(50).min(5),
  countryId: Joi.string().required().max(50).min(2)
});

const receiverJoiSchema = Joi.object({
  name: nameSchema,
  address: addressSchema,
  contactNumber: Joi.number().integer().required(),
  email: Joi.string().email().required().pattern(regExp.email),
});

module.exports = { receiverJoiSchema };
