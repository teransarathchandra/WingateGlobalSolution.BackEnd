const Joi = require('joi');

const paymentMethodJoiSchema = Joi.object({
    paymentMethodId: Joi.string(),
    userName: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    method: Joi.string().required(), 
});

module.exports = paymentMethodJoiSchema;