const Joi = require('joi');

const warehouseJoiSchema = Joi.object({
    location: Joi.string(),
    storageCapacity: Joi.number(),
    availability: Joi.boolean(),
    warehouseManagerId: Joi.string(),
    countryId: Joi.string() 
});

module.exports = warehouseJoiSchema;