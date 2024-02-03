const Joi = require('joi');

const warehouseJoiSchema = Joi.object({
    warehouseId: Joi.number().required(),
    location: Joi.string().required(),
    storageCapacity: Joi.string().required(),
    availability: Joi.boolean().required(),
    warehouseManagerId: Joi.number().required(),
    countryId: Joi.string().required() 
});

module.exports = employeeJoiSchema;