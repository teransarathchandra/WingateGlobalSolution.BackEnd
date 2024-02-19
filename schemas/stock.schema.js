const Joi = require("joi");

const stockJoiSchema = Joi.object({
  stockId: Joi.string(),
  city: Joi.string().max(50).required(),
  country: Joi.string().max(50),
  warehouseId: Joi.string().required(),
  bulkId: Joi.string().required(),
});

module.exports = stockJoiSchema;
