const Joi = require('joi');

const systemAccessJoiSchema = Joi.object({
  accessLevelId: Joi.number().required(),
  description: Joi.string().required().max(255).min(15),
});

module.exports = systemAccessJoiSchema;
