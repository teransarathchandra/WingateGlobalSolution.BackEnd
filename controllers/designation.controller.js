const mongoose = require('mongoose');

const { Designation } = require('../models');
const { designationSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllDesignations = async (req, res) => {

    try {

        const designation = await Designation.find();

        if (!designation) {
            res.status(404).json({ status: 404, message: 'Designation not found' });
        }

        res.status(200).json({ status: 200, data: designation, message: 'Designation found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const getDesignationById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid designation id' });
        }

        const designation = await Designation.findById(id);

        if (!designation) {
            return res.status(404).json({ status: 404, message: 'Designation not found' });
        }

        res.status(200).json({ status: 200, data: designation, message: 'Designation found successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const createDesignation = async (req, res) => {

    try {
        const { value, error } = designationSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
            //return res.status(400).json({ status: 400, error: error });
        }

        const { basicSalary, etf, epf, allowance, accessLevelId } = value;

        const designation = await Designation.create({
            basicSalary,
            etf,
            epf,
            allowance,
            accessLevelId

        })

        if (!designation) {
            return res.status(400).json({ message: 'Designation cannot create' });
        }

        res.status(201).json({ data: designation, message: 'Designation created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateDesignation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid designation id' });
        }

        const { value, error } = designationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedDesignation = await Designation.findByIdAndUpdate(id, value, { new: true });

        if (!updatedDesignation) {
            return res.status(404).json({ status: 404, message: 'Designation not found' });
        }

        res.status(200).json({ status: 200, data: updatedDesignation, message: 'Designation updated successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid designation id' });
        }

        const deletedDesignation = await Designation.findByIdAndDelete(id);

        if (!deletedDesignation) {
            return res.status(404).json({ status: 404, message: 'Designation not found' });
        }

        res.status(200).json({ status: 200, message: 'Designation deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });

    }
};

module.exports = { getAllDesignations, getDesignationById, createDesignation, updateDesignation, deleteDesignation };