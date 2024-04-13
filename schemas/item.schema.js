const Joi = require('joi');

const itemJoiSchema = Joi.object({
  itemName: Joi.string(),
  description: Joi.string(),
  weight: Joi.number().required(),
  itemValue: Joi.number(),
  packageCount: Joi.number(),
  // orderId: Joi.string().required(), 
  categoryId: Joi.string().required(),
  packageTypeId: Joi.string().required(),
  isPickupOrder: Joi.bool().required(),
  pickupOrderDate: Joi.date().allow(null).when('isPickupOrder', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
});

module.exports = itemJoiSchema;
