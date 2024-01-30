const Joi = require('joi');

const { password, name } = require('../constants/regExp');

const employeeJoiSchema = Joi.object({
    employeeId: Joi.number().required(),
    name: Joi.string().min(10).max(255).pattern(new RegExp(name)).required(),
    address: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(8).max(50).pattern(new RegExp(password)).required(), // Replace 'your-regex-pattern' with the actual regex for password validation
    contactNumber: Joi.number().required(),
    designationId: Joi.string().required(), // Assuming this is a string representation of ObjectId
    countryId: Joi.string().required() // Assuming this is a string representation of ObjectId
});

module.exports = employeeJoiSchema;