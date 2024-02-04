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
    password: Joi.string().required().min(8).max(50)
});

const registerSchema = Joi.object({
    userId: Joi.number().required().integer(),
    name: nameSchema,
    email: Joi.string().email().required(),
    contactNumber: Joi.number().required().integer(),
    address: addressSchema,
    username: Joi.string().required(),  
    password: Joi.string().required().min(8).max(50).regex(password),    
    countryId: Joi.string().required()
});

const updateSchema = Joi.object({
    name: nameSchema,
    email: Joi.string().email(),
    contactNumber: Joi.number().integer(),
    address: addressSchema,
    username: Joi.string(),
    password: Joi.string().min(8).max(50).regex(password),
    countryId: Joi.string()
});

module.exports = { registerSchema, loginSchema, updateSchema };