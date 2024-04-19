const Joi = require("joi");

const submittedDocumentJoiSchema = Joi.object({
  documentName: Joi.string().required(),
  documentType: Joi.string().max(50).required(),
  folderName: Joi.string().required(),
  documentPath: Joi.string().uri().required(),
  itemId: Joi.string().required()

});

module.exports = submittedDocumentJoiSchema;