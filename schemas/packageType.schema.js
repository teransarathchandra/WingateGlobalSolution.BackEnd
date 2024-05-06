const Joi = require("joi");

const packageTypeJoiSchema = Joi.object({
  packageName: Joi.string().max(100).required(),
  packagingCost: Joi.number().required().min(0),
  width: Joi.number().min(0),
  length: Joi.number().min(0),
  height: Joi.number().min(0),
  maximumWeight: Joi.number().min(0),
  maximumHeight: Joi.number().min(0),
  type: Joi.string().required(),
});

module.exports = packageTypeJoiSchema;
