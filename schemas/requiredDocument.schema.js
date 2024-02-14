const Joi = require("joi");

const requiredDocumentJoiSchema = Joi.object({
  requiredDocumentId: Joi.number().required(),
  documentType: Joi.string().max(50).required(),
  documentPath: Joi.string(),
  itemId: Joi.string().required()

});

module.exports = requiredDocumentJoiSchema;