const Joi = require('joi');

const systemAccessJoiSchema = Joi.object({
  description: Joi.string().required().max(255).min(1),
  accessAreas: Joi.string().required().max(255).min(1),
});

module.exports = systemAccessJoiSchema;
