const Joi = require("joi");

const createOrderJoiSchema = Joi.object({
  status: Joi.string().min(10).max(255).required(),
  packageCount: Joi.number().integer().min(1).default(1),
  priority: Joi.string().required(),
  userId: Joi.string().required(),
  itemId: Joi.string().required(),
  receiverId: Joi.string().required(),
  isPickupOrder: Joi.boolean().required(),
  //routeId: Joi.string().required(),
  orderId: Joi.string().required(),
  stockId: Joi.string(),
  bulkId: Joi.string(),
  packageId: Joi.string().required(),
});

const updateOrderJoiSchema = Joi.object({
  _id: Joi.string(),
  bulkId: Joi.string(),
  status: Joi.string().min(3).max(255),
});

module.exports = { createOrderJoiSchema, updateOrderJoiSchema };
