const Joi = require('joi');

const flightJoiSchema = Joi.object({
  flightId: Joi.string(),
  type: Joi.string(),
  routeCostPerKilo: Joi.number(),
  arrival: Joi.string(),
  arrivalTime: Joi.string(),
  departure: Joi.string(),
  departureTime: Joi.string(),
  AirlineId: Joi.string()
});

module.exports = flightJoiSchema;
