const Joi = require('joi');

const { regExp } = require('../constants');

const nameSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(255).regex(regExp.name),
    lastName: Joi.string().required().min(2).max(255).regex(regExp.name)
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
    email: Joi.string().email().required(),
    contactNumber: Joi.number().required().integer(),
    address: addressSchema,
    password: Joi.string().required().min(8).max(100).regex(regExp.password)
});

const updateSchema = Joi.object({
    name: nameSchema.optional(),
    email: Joi.string().email(),
    contactNumber: Joi.number().integer(),
    address: addressSchema,
    password: Joi.string().min(8).max(100).regex(regExp.password)
});

module.exports = { registerSchema, loginSchema, updateSchema };