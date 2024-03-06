const Joi = require('joi');

const bulkJoiSchema = Joi.object({

  bulkId: Joi.string().required(),
  currentLocation: Joi.string(),
  arrivedTime: Joi.string(),
  status: Joi.string().valid('In Progress', 'Arrived', 'Delivered'),
  vehicleAssignedDate: Joi.date().required(),
  vehicleId: Joi.string().required()
});

module.exports = bulkJoiSchema;
