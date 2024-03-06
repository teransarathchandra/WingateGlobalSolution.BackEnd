const Joi = require("joi");

const restrictedOrdersJoiSchema = Joi.object({
  maxQuantity: Joi.number().required(),
  exportLicense: Joi.boolean().required(),
  importPermit: Joi.boolean().required(),
  safetyDataSheets: Joi.boolean().required(),
  phytosanitaryCertificate: Joi.boolean().required(),
  dangerousGoodsDeclaration: Joi.boolean().required(),
  categoryId: Joi.string().required(),
  sendingCountryId: Joi.string().required(),
  receivingCountryId: Joi.string().required()
})

module.exports = restrictedOrdersJoiSchema;