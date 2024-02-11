const mongoose = require('mongoose');

const Driver = require('../models/driver.model');
const DriverSchema = require('../schemas/driver.schema')

const getAllDrivers = async (req, res) => {

    try {
        const driver = await Driver.find();

        if (!driver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: driver, message: "Driver Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getDriverById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Driver id" })
        }

        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: driver, message: "Driver Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createDriver = async (req, res) => {

    try {
        const { value, error } = DriverSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { driverId, warehouseId } = value;

        const driver = await Driver.create({
            driverId,
            warehouseId,

        });

        if (!driver) {
            return res.status(400).json({ message: 'Driver Cannot Create' });
        }

        res.status(201).json({ data: driver, message: 'Driver Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateDriver = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid driver id" });
        }

        const { value, error } = DriverSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedDriver = await Driver.findByIdAndUpdate(id, value, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: updatedDriver, message: "Driver Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteDriver = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Driver id" });
        }

        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, message: "Driver Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver };