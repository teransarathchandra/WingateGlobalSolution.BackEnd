const Joi = require('joi');

const driverJoiSchema = Joi.object({
    employeeId: Joi.string().required(),
    warehouseId: Joi.string().required() 
});

module.exports = driverJoiSchema;