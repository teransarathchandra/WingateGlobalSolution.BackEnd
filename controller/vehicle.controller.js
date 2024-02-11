const mongoose = require("mongoose");

const Vehicle = require("../models/vehicle.model");
const VehicleSchema = require("../schemas/vehicle.schema");

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
      .json({ status: 200, data: vehicle, message: "Vehicles Found" });
  } catch (err) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again",
      message: err.message,
    });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid  Vehicle Id" });
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
      message: "Vehicle Found Successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again",
      message: err.message,
    });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { value, error } = VehicleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error });
    }

    const { vehicleId, vehicleType, availability } = value;

    const vehicle = await Vehicle.create({
      vehicleId,
      vehicleType,
      availability,
    });

    if (!vehicle) {
      return res.status(400).json({ message: "Vehicle Cannot Create" });
    }

    res.status(201).json({ message: "Vehicle Created Successfully" });
  } catch (err) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again",
      message: err.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid  Vehicle Id" });
    }

    const { value, error } = VehicleSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, error: error });
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
      message: "Vehicle Updated Successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again",
      message: err.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ status: 404, error: "Invalid vehicle id" });
    }

    const deleteVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deleteVehicle) {
      return res
        .status(404)
        .json({ status: 404, message: "Vehicle not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Vehicle Deleted Successfully" });
  } catch (err) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again",
      message: err.message,
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
