const Joi = require('joi');

const quotationJoiSchema = Joi.object({
    packagingCost: Joi.number().min(0).required(),
    routeCost: Joi.number().min(0).required(),
    unitWeightCost: Joi.number().min(0).required(),
    pickUpCost: Joi.number().min(0).required(), 
    surcharge: Joi.number().min(0).required(),
    orderId: Joi.string().required(), 
});

const calculatingAmountJoiSchema = Joi.object({
    packageCount: Joi.number().min(0).required(),
    weight: Joi.number().min(0).required(),
    packageTypeId: Joi.string().min(0),
    categoryId: Joi.string().min(0), 
});


module.exports = {quotationJoiSchema , calculatingAmountJoiSchema};