const Joi = require('joi');

const designationJoiSchema = Joi.object({
  designationId: Joi.number().required(),
  basicSalary: Joi.number().required(),
  etf: Joi.number().required(),
  epf: Joi.number().required(),
  allowance: Joi.number().required(),
  accessLevelId: Joi.string().required(),
});

module.exports = designationJoiSchema;
