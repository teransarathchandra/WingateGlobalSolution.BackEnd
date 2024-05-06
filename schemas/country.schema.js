const Joi = require('joi');

const countryJoiSchema = Joi.object({
  countryCode: Joi.string().min(2).max(5),
  name: Joi.string().min(1).max(255),
  currency: Joi.string().min(1).max(5),
  cost: Joi.number()
})

module.exports = countryJoiSchema;
