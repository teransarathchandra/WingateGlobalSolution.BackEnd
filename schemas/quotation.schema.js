const Joi = require('joi');

const quotationJoiSchema = Joi.object({
    packagingCost: Joi.number().min(0),
    routeCost: Joi.number().min(0),
    unitWeightCost: Joi.number().min(0),
    pickUpCost: Joi.number().min(0), 
    surcharge: Joi.number().min(0),
    orderId: Joi.string(),
    fullAmount: Joi.number()

});

const calculatingAmountJoiSchema = Joi.object({
    packageCount: Joi.number().min(0),
    weight: Joi.number().min(0),
    packageTypeId: Joi.string().min(0),
    categoryId: Joi.string().min(0), 
    packagingCost: Joi.number().min(0),
    routeCost: Joi.number().min(0),
    unitWeightCost: Joi.number().min(0),
    fullAmount: Joi.number()
});


module.exports = {quotationJoiSchema, calculatingAmountJoiSchema};