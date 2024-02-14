const Joi = require("joi");

const { regExp } = require("../constants");

const emailSchema = Joi.object({
    toEmail: Joi.string()
        .pattern(regExp.email)
        .required(),
    emailSubject: Joi.string()
        .min(10)
        .max(256)
        .required(),
    emailBody: Joi.string()
        .min(10)
        .max(256)
        .required()
});

module.exports = emailSchema;