const Joi = require("joi");

const salesJoiSchema = Joi.object({
  description: Joi.string().min(10).max(255).required(),
  amount: Joi.number().required().min(0),
  status: Joi.string().min(10).max(255).default("In Progress"),
  salesDate: Joi.date().required(),
  salesPersonId: Joi.string().required(), 
  customerId: Joi.string().required(), 
});

module.exports = salesJoiSchema;
