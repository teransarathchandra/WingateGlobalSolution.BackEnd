const Joi = require("joi");

const stockJoiSchema = Joi.object({
  city: Joi.string().max(50).required(),
  country: Joi.string().max(50),
  warehouseId: Joi.string().required(),
  bulkId: Joi.string().required(),
});

module.exports = stockJoiSchema;
