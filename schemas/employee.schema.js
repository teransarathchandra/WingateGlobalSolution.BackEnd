const Joi = require('joi');

const { password, name } = require('../constants/regExp');

const nameSchema = Joi.object({
    firstName: Joi.string().required().min(5).max(255).regex(name),
    lastName: Joi.string().required().min(5).max(255).regex(name),
});

const addressSchema = Joi.object({
    street: Joi.string().required().max(50).min(5),
    city: Joi.string().required().max(50).min(5),
    state: Joi.string().required().max(50).min(5),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(100)
});

const registerSchema = Joi.object({
    employeeId: Joi.number().required().integer(),
    name: nameSchema,
    address: addressSchema,
    username: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(100).regex(password),
    contactNumber: Joi.number().required().integer(),
    designationId: Joi.string().required(),
    countryId: Joi.string().required()
});

const updateSchema = Joi.object({
    name: nameSchema,
    address: addressSchema,
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(100).regex(password),
    contactNumber: Joi.number().integer(),
    designationId: Joi.string(),
    countryId: Joi.string()
});

module.exports = { registerSchema, loginSchema, updateSchema };