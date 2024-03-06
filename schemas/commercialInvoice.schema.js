const Joi = require("joi");

const commercialInvoiceJoiSchema = Joi.object({
  orderId: Joi.string().required(),
  documentPath: Joi.string().required()
});

module.exports = commercialInvoiceJoiSchema;
