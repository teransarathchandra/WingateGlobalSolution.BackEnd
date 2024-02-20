const Joi = require('joi');

const routeJoiSchema = Joi.object({
  transportMode: Joi.string().max(10).required(),
  distance: Joi.number().required(),
  priority: Joi.string().required(),
  roundTripDays: Joi.number().required(),
  routeShippingCost: Joi.number().required(),
  startingPortId: Joi.string().required(),
  endingPortId: Joi.string()
});

module.exports = routeJoiSchema;
