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
        .max(10000)
        .required()
        .description('HTML content is accepted and should be well-formatted.')
});

module.exports = emailSchema;