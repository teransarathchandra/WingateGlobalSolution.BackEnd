const Joi = require('joi');

const warehouseJoiSchema = Joi.object({
    storageCapacity: Joi.number(),
    availability: Joi.boolean(),
    location: Joi.string(),
   
});

module.exports = warehouseJoiSchema;