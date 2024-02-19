const mongoose = require("mongoose");

const { Vehicle } = require("../models");
const { vehicleSchema } = require("../schemas");

const getAllVehicles = async (req, res) => {
  try {
    const vehicle = await Vehicle.find();

    if (!vehicle) {
      return res
        .status(404)
        .json({ status: 404, message: "Vehicle not found" });
    }

    res
      .status(200)
      .json({ status: 200, data: vehicle, message: "Vehicles found successfully" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
            message: 'Your request cannot be processed. Please try again'
    });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid  vehicle id" });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ status: 404, message: "Vehicle not found" });
    }

    res.status(200).json({
      status: 200,
      data: vehicle,
      message: "Vehicle found successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
            message: 'Your request cannot be processed. Please try again'
    });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { value, error } = vehicleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, message: error });
    }

    const { vehicleId, vehicleType, availability } = value;

    const vehicle = await Vehicle.create({
      vehicleId,
      vehicleType,
      availability,
    });

    if (!vehicle) {
      return res.status(400).json({ message: "Vehicle cannot create" });
    }

    res.status(201).json({ message: "Vehicle created successfully" });
  } catch (err) {
      res.status(400).json({
      error: err.message,
      message: 'Your request cannot be processed. Please try again'
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid  vehicle id" });
    }

    const { value, error } = vehicleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, message: error });
    }

    const updateVehicle = await Vehicle.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updateVehicle) {
      return res
        .status(404)
        .json({ status: 404, message: "Vehicle not found" });
    }

    res.status(200).json({
      status: 200,
      data: updateVehicle,
      message: "Vehicle updated successfully",
    });
  } catch (err) {
      res.status(400).json({
      error: err.message,
      message: 'Your request cannot be processed. Please try again'
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ status: 404, message: "Invalid vehicle id" });
    }

    const deleteVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deleteVehicle) {
      return res
        .status(404)
        .json({ status: 404, message: "Vehicle not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Vehicle deleted successfully" });
  } catch (err) {
      res.status(400).json({
      error: err.message,
      message: 'Your request cannot be processed. Please try again'
    });
  }
};
module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
