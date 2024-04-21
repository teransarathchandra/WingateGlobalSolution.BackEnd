const Joi = require('joi');

const paymentJoiSchema = Joi.object({
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(),
    paymentStatus: Joi.string().valid("Completed", "Pending", "Cancelled").required(), 
    paymentDate: Joi.date().required(),
    orderId: Joi.string().required(), // Assuming this is a string representation of ObjectId
});

module.exports = paymentJoiSchema;