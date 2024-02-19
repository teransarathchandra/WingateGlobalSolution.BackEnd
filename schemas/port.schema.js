const Joi = require('joi');

const portJoiSchema = Joi.object({

    portId: Joi.string(),
    portCode: Joi.string().required().min(2).max(5),
    name: Joi.string().required().min(10).max(255),
    type: Joi.string().required().min(5).max(20),
    countryId: Joi.string().required()
});

module.exports = portJoiSchema;