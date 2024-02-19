const Joi = require("joi");

const orderJoiSchema = Joi.object({
  status: Joi.string().min(10).max(255).required(),
  packageCount: Joi.number().integer().min(1).default(1),
  orderType: Joi.string().required(),
  userId: Joi.string().required(),
  routeId: Joi.string().required(),
  stockId: Joi.string(), 
  packageId: Joi.string().required(),
});

module.exports = orderJoiSchema;
