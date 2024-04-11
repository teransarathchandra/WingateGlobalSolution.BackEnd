const Joi = require('joi');

const quotationJoiSchema = Joi.object({
    packagingCost: Joi.number().min(0).required(),
    routeCost: Joi.number().min(0).required(),
    unitWeightCost: Joi.number().min(0).required(),
    pickUpCost: Joi.number().min(0).required(), 
    surcharge: Joi.number().min(0).required(),
    orderId: Joi.string().required(), 
});

module.exports = quotationJoiSchema;