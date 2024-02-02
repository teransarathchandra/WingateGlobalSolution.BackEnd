const Joi = require('joi');

const { email, password, name } = require('../constants/regExp');

const userJoiSchema = Joi.object({
    userId: Joi.number().required(),
    firstName: Joi.string().max(50).pattern(new RegExp(name)).required(),
    lastName: Joi.string().max(50),
    email: Joi.string().pattern(new RegExp(email)).required(),
    contactNumber: Joi.number().min(10).required(),
    address: Joi.string().min(10).max(255).required(),
    username: Joi.string().required(),
    password: Joi.string().min(8).max(50).pattern(new RegExp(password)).required(), 
    countryId: Joi.string().required()
});

module.exports = userJoiSchema;
