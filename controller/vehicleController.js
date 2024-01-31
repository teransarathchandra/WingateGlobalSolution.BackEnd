const mongoose = require('mongoose');

const Vehicle = require('../models/vehicle.model');
const VehicleSchema = require('../schemas/vehicleSchema');

const getAllVehicles = async (req, res) => {
    try {
        const vehicle = await Vehicle.find();
        
        if (!vehicle) {
            return res.status(404).json({ status: 404, message: "Vehicle not found" });
        }

        res.status(200).json({ status: 200, data: vehicle, message: "Vehicles Found" });

    }catch(err) {
        res.status(400).json({
            error :'Your request could not be processed. Please try again',
            message: err.message
        })
    }
};

const getvehicleById = async (req, res) => {
    try{

        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ status: 404, message: 'Invalid  Vehicle Id'});
        }

        const vehicle = await Vehicle.findById(id);

        if(!vehicle){
            return res.status(404).json({ status: 404, message: 'Vehicle not found'});
        }

        res.status(200).json({status: 200, data: vehicle, message: 'Vehicle Found Successfully'});



    }catch(err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again',
            message: err.message
        });
    }
};

const createVehicle = async (req, res) => {
    
    try {
            const { value, error } = VehicleSchema.validate(req.body);

            if (error) {
                return res.status(400).json ({ status: 400, error: error });
            }

            const { vehicleId, vehicleType, availability }  = value;

            const vehicle = await Vehicle.create({
                vehicleId,
                vehicleType,
                availability
            });

            if(!vehicle) {
                return res.status(400).json({ message : 'Vehicle Cannot Create'});
            }

            res.status(201).json({ message : 'Vehicle Created Successfully' });

    }catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again',
            message: err.message
        });
    }
};

const updateVehicle = (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ status: 404, message: 'Invalid  Vehicle Id'});
        }

        const { value, error } = VehicleSchema.validate(req.body);

        if (error) {
            return res.status(400).json ({ status: 400, error: error });
        }
    }catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again',
            message: err.message
        });
    }
};

module.exports = { getAllVehicles, getvehicleById, createVehicle, updateVehicle };