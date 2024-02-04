const Joi = require('joi');

const driverJoiSchema = Joi.object({
    driverId: Joi.string().required(),
    warehouseId: Joi.string().required() 
});

module.exports = driverJoiSchema;