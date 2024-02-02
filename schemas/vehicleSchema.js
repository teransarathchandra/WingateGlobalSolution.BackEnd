const Joi = require('joi');


const vehicleJoiSchema = Joi.object({
    vehicleId: Joi.number().required(),
    vehicleType: Joi.string().valid("Cargo Plane" , "Vessel Ship"),
    availability: Joi.boolean().required(),

})

module.exports = vehicleJoiSchema;