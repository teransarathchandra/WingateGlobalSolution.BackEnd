const Joi = require('joi');

const quotationJoiSchema = Joi.object({
    packagingCost: Joi.number().min(0),
    routeCost: Joi.number().min(0),
    unitWeightCost: Joi.number().min(0),
    pickUpCost: Joi.number().min(0), 
    surcharge: Joi.number().min(0),
    orderId: Joi.string(), 
});

const calculatingAmountJoiSchema = Joi.object({
    packageCount: Joi.number().min(0).required(),
    weight: Joi.number().min(0).required(),
    packageTypeId: Joi.string().min(0),
    categoryId: Joi.string().min(0), 
});


module.exports = {quotationJoiSchema, calculatingAmountJoiSchema};