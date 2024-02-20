const Joi = require('joi');

const vehicleJoiSchema = Joi.object({
    vehicleType: Joi.string().valid("Cargo Plane" , "Vessel Ship"),
    availability: Joi.boolean().required(),
    vehicleAssignedDate: Joi.date().required(),
    routeId:Joi.string().required()
})


module.exports = vehicleJoiSchema;