const Joi = require('joi');

const bulkJoiSchema = Joi.object({

  bulkId: Joi.string().required(),
  currentLocation: Joi.string(),
  arrivedTime: Joi.string(),
  status: Joi.string().valid('In Progress', 'Completed'),
  destinationCountry: Joi.string().required(),
  masterAirwayBillId: Joi.string(),
  flightId: Joi.string().required
});

module.exports = bulkJoiSchema;
