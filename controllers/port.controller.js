const mongoose = require('mongoose');

const { Port } = require('../models');
const { portSchema } = require('../schemas');

const getAllPorts = async (req, res) => {

    try {

        const port = await Port.find();

        if (!port) {
            res.status(404).json({ status: 404, message: 'Port not found' });
        }

        res.status(200).json({ status: 200, data: port, message: 'Port found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const getPortById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid Port id' });
        }

        const port = await Port.findById(id);

        if (!port) {
            return res.status(404).json({ status: 404, message: 'Port not found' });
        }

        res.status(200).json({ status: 200, data: port, message: 'Port found successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const createPort = async (req, res) => {

    try {
        const { value, error } = portSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { portCode, name, type, countryId } = value;

        const port = await Port.create({
            portCode,
            name,
            type,
            countryId
        })

        if (!port) {
            return res.status(400).json({ message: 'Port cannot create' });
        }

        res.status(201).json({ data: port, message: 'Port created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updatePort = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid port id' });
        }

        const { value, error } = portSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedPort = await Port.findByIdAndUpdate(id, value, { new: true });

        if (!updatedPort) {
            return res.status(404).json({ status: 404, message: 'Port not found' });
        }

        res.status(200).json({ status: 200, data: updatedPort, message: 'Port updated Successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deletePort = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid port id' });
        }

        const deletedPort = await Port.findByIdAndDelete(id);

        if (!deletedPort) {
            return res.status(404).json({ status: 404, message: 'Port not found' });
        }

        res.status(200).json({ status: 200, message: 'Port deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });

    }
};

module.exports = { createPort, getAllPorts, getPortById, updatePort, deletePort };