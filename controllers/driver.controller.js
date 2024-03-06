const mongoose = require('mongoose');

const { Driver } = require('../models');
const { driverSchema } = require('../schemas')

const getAllDrivers = async (req, res) => {

    try {
        const driver = await Driver.find();

        if (!driver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: driver, message: "Driver found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getDriverById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid driver id" })
        }

        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: driver, message: "Driver found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createDriver = async (req, res) => {

    try {
        const { value, error } = driverSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { employeeId, warehouseId } = value;

        const driver = await Driver.create({
            employeeId,
            warehouseId,

        });

        if (!driver) {
            return res.status(400).json({ message: 'Driver cannot create' });
        }

        res.status(201).json({ data: driver, message: 'Driver created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateDriver = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid driver id" });
        }

        const { value, error } = driverSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedDriver = await Driver.findByIdAndUpdate(id, value, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, data: updatedDriver, message: "Driver updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteDriver = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid driver id" });
        }

        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) {
            return res.status(404).json({ status: 404, message: "Driver not found" });
        }

        res.status(200).json({ status: 200, message: "Driver deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver };