const Joi = require('joi');

const deliveryDetailsSchema = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
});

const customerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    deliveryDetails: deliveryDetailsSchema.required()
});

const amountDetailSchema = Joi.object({
    currency: Joi.string().required(),
    gross: Joi.number().required(),
    fee: Joi.number().required(),
    net: Joi.number().required(),
    exchangeRate: Joi.number().required(),
    exchangeFrom: Joi.string().required(),
    exchangeTo: Joi.string().required()
});

const paymentMethodSchema = Joi.object({
    method: Joi.string().required(),
    cardCustomerName: Joi.string().required(),
    cardNo: Joi.string().required()
});

const itemSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    currency: Joi.string().required(),
    unitPrice: Joi.number().required(),
    totalPrice: Joi.number().required()
});

const paymentJoiSchema = Joi.object({
    paymentId: Joi.number().required(),
    orderId: Joi.string().required(),
    paymentDate: Joi.date().required(),
    description: Joi.string().required(),
    paymentStatus: Joi.string().valid('RECEIVED', 'PENDING', 'CANCELLED', 'FAILED').required(),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
    customer: customerSchema,
    amountDetail: amountDetailSchema,
    paymentMethod: paymentMethodSchema,
    items: Joi.array().items(itemSchema),
    customFields: Joi.object({
        custom1: Joi.string().allow(null, ''),
        custom2: Joi.string().allow(null, '')
    }).optional()
});

// const paymentJoiSchema = Joi.object({
//     amount: Joi.number().required(),
//     paymentMethod: Joi.string().required(),
//     paymentStatus: Joi.string().valid("Completed", "Pending", "Cancelled").required(), 
//     paymentDate: Joi.date().required(),
//     orderId: Joi.string().required(), // Assuming this is a string representation of ObjectId
// });

module.exports = paymentJoiSchema;