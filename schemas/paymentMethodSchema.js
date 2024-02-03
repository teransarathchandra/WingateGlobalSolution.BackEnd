const Joi = require('joi');

const paymentMethodJoiSchema = Joi.object({
    paymentMethodId: Joi.number().required(),
    UserName: Joi.string().max(50).required(),
    amount: Joi.string().min(0).required(),
    paymentMethod: Joi.string().required(), 
});

module.exports = paymentMethodJoiSchema;