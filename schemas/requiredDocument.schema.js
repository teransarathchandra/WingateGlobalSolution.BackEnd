const Joi = require("joi");

const requiredDocumentJoiSchema = Joi.object({
  documentType: Joi.string().max(50).required(),
  documentPath: Joi.string(),
  itemId: Joi.string().required()

});

module.exports = requiredDocumentJoiSchema;