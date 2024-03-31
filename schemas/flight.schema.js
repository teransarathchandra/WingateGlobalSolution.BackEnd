const Joi = require('joi');

const flightJoiSchema = Joi.object({
  flightId: Joi.string().required(),
  type: Joi.string(),
  routeCostPerKilo: Joi.number(),
  arrival: Joi.string().required(),
  arrivalTime: Joi.date(),
  departure: Joi.string().required(),
  departureTime: Joi.date(),
  AirlineId: Joi.string().required()
});

module.exports = flightJoiSchema;
