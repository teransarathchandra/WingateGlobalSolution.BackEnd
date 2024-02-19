const Joi = require('joi');

const bulkJoiSchema = Joi.object({

  bulkId: Joi.string(),
  currentLocation: Joi.string(),
  arrivedTime: Joi.string(),
  status: Joi.string().valid('In Progress', 'Arrived', 'Delivered'),
  vehicleId: Joi.string().required()
});

module.exports = bulkJoiSchema;
