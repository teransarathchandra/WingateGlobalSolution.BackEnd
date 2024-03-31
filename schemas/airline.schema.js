const Joi = require('joi');

const airlineJoiSchema = Joi.object({
    airlineId: Joi.string().required(),
    code: Joi.string().min(2).max(4),
    name: Joi.string().min(5).max(50)
});

module.exports = airlineJoiSchema;
