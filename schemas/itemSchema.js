const Joi = require('joi');

const itemJoiSchema = Joi.object({
  itemId: Joi.number().required(),
  name: Joi.string(),
  description: Joi.string(),
  weight: Joi.number().required(),
  itemValue: Joi.number(), 
  orderId: Joi.number().required(), 
  categoryId: Joi.number().required(),
});

module.exports = itemJoiSchema;
