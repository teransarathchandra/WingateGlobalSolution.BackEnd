const Joi = require('joi');

const routeSchema = Joi.object({
  routeId: Joi.number().required(),
  transportMode: Joi.string().max(10).required(),
  distance: Joi.number().required(),
  priority: Joi.string().required(),
  roundTripDays: Joi.number().required(),
  routeShippingCost: Joi.number().required(),
  startingPortId: Joi.string().required(),
  endingPortId: Joi.string().required()
});

module.exports = routeSchema;
