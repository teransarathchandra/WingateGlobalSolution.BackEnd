const Joi = require('joi');

const bulkJoiSchema = Joi.object({
  currentLocation: Joi.string(),
  arrivedTime: Joi.string(),
  status: Joi.string().valid('In Progress', 'Arrived', 'Delivered'),
  vehicleId: Joi.string().required()
});

module.exports = bulkJoiSchema;
