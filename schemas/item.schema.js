const Joi = require('joi');

const createItemSchema = Joi.object({
  itemName: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500).allow(''),
  weight: Joi.number().required().min(0.1).max(10000),
  itemValue: Joi.number().min(100).max(100000000),
  packageCount: Joi.number().min(1).max(10000),
  categoryId: Joi.string().required().length(24),
  packageTypeId: Joi.string().required().length(24),
  isPickupOrder: Joi.bool().required(),
  pickupOrderDate: Joi.date().allow(null).when('isPickupOrder', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
});

const updateItemSchema = Joi.object({
  itemName: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500).allow(''),
  weight: Joi.number().min(0.1).max(10000),
  itemValue: Joi.number().min(100).max(100000000),
  packageCount: Joi.number().min(1).max(10000),
  categoryId: Joi.string().length(24),
  packageTypeId: Joi.string().length(24),
  isPickupOrder: Joi.bool(),
  pickupOrderDate: Joi.date().allow(null).when('isPickupOrder', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
});

module.exports = { createItemSchema, updateItemSchema };
