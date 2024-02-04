const Joi = require('joi');

const paymentMethodJoiSchema = Joi.object({
    paymentMethodId: Joi.number().required(),
    userName: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    method: Joi.string().required(), 
});

module.exports = paymentMethodJoiSchema;