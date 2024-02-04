const Joi = require('joi');

const paymentJoiSchema = Joi.object({
    paymentId: Joi.number().required(),
    paymentDescription: Joi.string().max(255),
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(), 
    paymentStatus: Joi.string().valid("Completed", "Pending", "Cancelled").required(),
    orderId: Joi.string().required(), // Assuming this is a string representation of ObjectId
});

module.exports = paymentJoiSchema;