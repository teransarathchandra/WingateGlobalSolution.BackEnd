const Joi = require('joi');

const warehouseJoiSchema = Joi.object({
    location: Joi.string().required(),
    storageCapacity: Joi.number().required(),
    availability: Joi.boolean().required(),
    warehouseManagerId: Joi.string().required(),
    countryId: Joi.string().required() 
});

module.exports = warehouseJoiSchema;