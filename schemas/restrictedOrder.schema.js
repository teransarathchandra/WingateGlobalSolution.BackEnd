const Joi = require("joi");

const restrictedOrdersJoiSchema = Joi.object({
  sendingCountryId: Joi.string().required(),
  receivingCountryId: Joi.string().required(),
  categoryId: Joi.string().required(),
  maxQuantity: Joi.number().required(),
  exportLicense: Joi.boolean().required(),
  importPermit: Joi.boolean().required(),
  safetyDataSheets: Joi.boolean().required(),
  phytosanitaryCertificate: Joi.boolean().required(),
  dangerousGoodsDeclaration: Joi.boolean().required() 
})

module.exports = restrictedOrdersJoiSchema;