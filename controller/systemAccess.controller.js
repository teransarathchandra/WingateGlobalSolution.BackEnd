const mongoose = require('mongoose');

const SystemAccess = require('../models/systemAccess.model');
const SystemAccessSchema = require('../schemas/systemAccess.schema');

const getAllSystemAccess = async (req, res) => {

    try {

        const systemAccess = await SystemAccess.find();

        if (!systemAccess) {
            res.status(404).json({ status: 404, message: 'System Access not found' });
        }

        res.status(200).json({ status: 200, data: systemAccess, message: 'System Access Found' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const getSystemAccessById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, error: 'Invalid System Access Id' });
        }

        const systemAccess = await SystemAccess.findById(id);

        if (!systemAccess) {
            return res.status(404).json({ status: 404, message: 'System Access not Found' });
        }

        res.status(200).json({ status: 200, data: systemAccess, message: 'System Access Found' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const createSystemAccess = async (req, res) => {

    try {
        const { value, error } = SystemAccessSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { accessLevelId, description } = value;

        const systemAccess = await SystemAccess.create({
            accessLevelId,
            description
        })

        if (!systemAccess) {
            return res.status(400).json({ message: 'System Access Cannot Create' });
        }

        res.status(201).json({ data: systemAccess, message: 'System Access Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });
    }
};

const updateSystemAccess = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid System Access Id' });
        }

        const { value, error } = SystemAccessSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedSystemAccess = await SystemAccess.findByIdAndUpdate(id, value, { new: true });

        if (!updatedSystemAccess) {
            return res.status(404).json({ status: 404, message: 'System Access not Found' });
        }

        res.status(200).json({ status: 200, data: updatedSystemAccess, message: 'System Access Updated Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteSystemAccess = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid System Access Id' });
        }

        const deletedSystemAccess = await SystemAccess.findByIdAndDelete(id);

        if (!deletedSystemAccess) {
            return res.status(404).json({ status: 404, message: 'System Access not Found' });
        }

        res.status(200).json({ status: 200, message: 'System Access deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });

    }
};

module.exports = { getAllSystemAccess, getSystemAccessById, createSystemAccess, updateSystemAccess, deleteSystemAccess };