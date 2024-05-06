const Joi = require('joi');

const paymentMethodJoiSchema = Joi.object({
    userName: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    method: Joi.string().required(), 
});

module.exports = paymentMethodJoiSchema;