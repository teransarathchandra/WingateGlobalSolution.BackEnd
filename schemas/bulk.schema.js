const Joi = require('joi');

const bulkJoiSchema = Joi.object({
  bulkId: Joi.string(),
  currentLocation: Joi.string(),
  arrivedTime: Joi.string(),
  status: Joi.string().valid('In Progress', 'Completed', 'Manifested', 'Delivered', 'Departed', 'In Transit'),
  destinationCountry: Joi.string(),
  category: Joi.string(),
  priority: Joi.string(),
  masterAirwayBillId: Joi.string(),
  flightId: Joi.string()
});

module.exports = bulkJoiSchema;
