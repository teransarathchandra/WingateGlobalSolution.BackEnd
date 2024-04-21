const Joi = require("joi");

const createOrderJoiSchema = Joi.object({
  status: Joi.string().min(3).max(255).required(),
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
  status: Joi.string().min(3).max(255),
  senderId: Joi.string(),
  receiverId: Joi.string(),
  isPickupOrder: Joi.boolean(),
  pickupDate: Joi.date(),
  priority: Joi.string(),
  userId: Joi.string(),
  orderId: Joi.string(),
  stockId: Joi.string(),
  bulkId: Joi.string(),
  paymentId: Joi.string(),
  invoiceId: Joi.string(),
  quotationId: Joi.string(),
});

module.exports = { createOrderJoiSchema, updateOrderJoiSchema };
