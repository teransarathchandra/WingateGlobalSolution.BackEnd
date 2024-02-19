const Joi = require('joi');

const itemJoiSchema = Joi.object({
  itemId: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  weight: Joi.number().required(),
  itemValue: Joi.number(), 
  orderId: Joi.string().required(), 
  categoryId: Joi.string().required(),
});

module.exports = itemJoiSchema;
