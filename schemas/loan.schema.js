const Joi = require('joi');

const loanJoiSchema = Joi.object({
  loanId: Joi.string(),
  amount: Joi.number().required(),
  interestRate: Joi.number().required(),
  recurrence: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  employeeId: Joi.string().required(),
});

module.exports = loanJoiSchema;
