const Joi = require("joi");

const submittedDocumentJoiSchema = Joi.object({
  submittedDocumentId: Joi.string(),
  documentName: Joi.string().required(),
  documentType: Joi.string().max(50).required(),
  folderName: Joi.string().required(),
  documentPath: Joi.string().uri().required(),
  referenceId: Joi.string().required(),
  remark: Joi.string()
});

module.exports = submittedDocumentJoiSchema;