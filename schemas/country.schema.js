const Joi = require('joi');

const countryJoiSchema = Joi.object({
  countryCode: Joi.string().required().min(2).max(5),
  name: Joi.string().required().min(10).max(255),
  currency: Joi.string().required().min(1).max(5),
})

module.exports = countryJoiSchema;
