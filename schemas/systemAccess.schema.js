const Joi = require('joi');

const systemAccessJoiSchema = Joi.object({
  description: Joi.string().required().max(255).min(15),
});

module.exports = systemAccessJoiSchema;
