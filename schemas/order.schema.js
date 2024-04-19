const Joi = require("joi");

const createOrderJoiSchema = Joi.object({
  status: Joi.string().min(3).max(255).required(),
  itemId: Joi.string().required(),
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  isPickupOrder: Joi.boolean().required(),
  pickupDate: Joi.date(),
  priority: Joi.string().required(),
  userId: Joi.string(),
  orderId: Joi.string(),
  stockId: Joi.string(),
  bulkId: Joi.string(),
  paymentId: Joi.string(),
  invoiceId: Joi.string(),
  quotationId: Joi.string(),
});

const updateOrderJoiSchema = Joi.object({
  _id: Joi.string(),
  bulkId: Joi.string(),
  status: Joi.string().min(3).max(255),
});

module.exports = { createOrderJoiSchema, updateOrderJoiSchema };
