const Joi = require('joi');

const registerSchema = Joi.object({
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
  birthday:Joi.date(),
  customerId: Joi.string().required(), 
});

const updateSchema = Joi.object({
    priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
    customerId: Joi.string().required(), 
});

module.exports = {registerSchema, updateSchema};
