const Joi = require('joi');

const createItemSchema = Joi.object({
  itemName: Joi.string(),
  description: Joi.string(),
  weight: Joi.number().required(),
  itemValue: Joi.number(),
  packageCount: Joi.number(),
  categoryId: Joi.string().required(),
  packageTypeId: Joi.string().required(),
  isPickupOrder: Joi.bool().required(),
  pickupOrderDate: Joi.date().allow(null).when('isPickupOrder', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
});

const updateItemSchema = Joi.object({
  itemName: Joi.string(),
  description: Joi.string(),
  weight: Joi.number(),
  itemValue: Joi.number(),
  packageCount: Joi.number(),
  categoryId: Joi.string(),
  packageTypeId: Joi.string(),
  isPickupOrder: Joi.bool(),
  pickupOrderDate: Joi.date().allow(null).when('isPickupOrder', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
});

module.exports = { createItemSchema, updateItemSchema };
