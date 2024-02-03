const Joi = require('joi');

const driverSchemaJoiSchema = Joi.object({
    driverId: Joi.number().required(),
    warehouseId: Joi.string().required() 
});

module.exports = employeeJoiSchema;