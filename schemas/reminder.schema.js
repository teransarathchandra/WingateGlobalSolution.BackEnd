const Joi = require("joi");

const reminderJoiSchema = Joi.object({
  reminderType: Joi.string().max(255),
  reminderDescription: Joi.string().max(255),
  reminderDate: Joi.date().required(),
  offer: Joi.number(),
  userId: Joi.string().required(),
});

module.exports = reminderJoiSchema;
