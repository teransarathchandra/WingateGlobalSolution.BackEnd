const Joi = require('joi');

const registerSchema = Joi.object({
  userId: Joi.string().required(), 
  priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
  birthday:Joi.date(),
});

const updateSchema = Joi.object({
    userId: Joi.string().required(), 
    priorityLevel: Joi.string().valid('High Priority', 'Medium Priority', 'Low Priority').required(),
    birthday:Joi.date(),
});

module.exports = {registerSchema, updateSchema};
