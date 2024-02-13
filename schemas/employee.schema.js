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
    country: Joi.string().required().max(50).min(2)
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(100)
});

const registerSchema = Joi.object({
    name: nameSchema,
    address: addressSchema,
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(100).regex(password),
    contactNumber: Joi.number().required().integer(),
    designationId: Joi.string().required()
});

const updateSchema = Joi.object({
    name: nameSchema,
    address: addressSchema,
    email: Joi.string().email(),
    password: Joi.string().min(8).max(100).regex(password),
    contactNumber: Joi.number().integer(),
    designationId: Joi.string()
});

module.exports = { registerSchema, loginSchema, updateSchema };