const Joi = require("joi");
const { regExp } = require('../constants');

const nameSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(100).regex(regExp.name),
    lastName: Joi.string().required().min(2).max(100).regex(regExp.name)
});

const addressSchema = Joi.object({
    street: Joi.string().required().max(50).min(5),
    city: Joi.string().required().max(50).min(5),
    state: Joi.string().required().max(50).min(5),
    countryId: Joi.string().required().max(50).min(2)
});

const createSchema = Joi.object({
    name: nameSchema,
    address: addressSchema,
    contactNumber: Joi.number().integer().required(),
    email: Joi.string().email().required().pattern(regExp.email),
});

const updateSchema = Joi.object({
    name: nameSchema,
    address: addressSchema,
    contactNumber: Joi.number().integer(),
    email: Joi.string().email().pattern(regExp.email),
});

module.exports = { createSchema, updateSchema };
