const Joi = require('joi');

const fileUploadSchema = Joi.object({
    type: Joi.string().required(),
    folderName: Joi.string().required(),
    fileName: Joi.string().required(),
    // timestamp: Joi.date().default(() => new Date(), 'time of upload'),
    url: Joi.string().uri().required()
});

module.exports = fileUploadSchema;