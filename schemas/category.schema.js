const Joi = require("joi");

const categoryJoiSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(255),
  profitRate: Joi.number().required().min(0),
  costPerKilo: Joi.number().required().min(0),
});

module.exports = categoryJoiSchema;
