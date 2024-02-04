const mongoose = require('mongoose');

const Designation = require('../models/designation.model');
const DesignationSchema = require ('../schemas/designationSchema');
const BadRequestError = require('../helpers/BadRequestError');

const getAllDesignations = async (req, res) => {

    try {

        const designation = await Designation.find();

        if (!designation){
            res.status(404).json({ status: 404, message: 'Designation not found' });
        }

        res.status(200).json({status: 200, data: designation, message: 'Designation Found'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const getDesignationById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({status: 400, error: 'Invalid Designation Id'});
        }

        const designation = await Designation.findById(id);

        if (!designation) {
            return res.status(404).json({status: 404, message: 'Designation not Found'});
        }

        res.status(200).json({status: 200, data: designation, message: 'Designation Found'});
    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const createDesignation = async (req, res) => {

    try {
        const { value, error } = DesignationSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
            //return res.status(400).json({ status: 400, error: error });
        }

        const { designationId, basicSalary, etf, epf, allowance, accessLevelId } = value;

        const designation = await Designation.create({
            designationId,
            basicSalary,
            etf,
            epf,
            allowance,
            accessLevelId

        })

        if (!designation) {
            return res.status(400).json ({message : 'Designation Cannot Create'});
        }

        res.status(201).json({data: designation, message: 'Designation Created Successfully'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });
    }
};

const updateDesignation = async (req, res) => {
    try {
        const { id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid Designation Id' });
        }

        const { value, error } = DesignationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({status: 400, error: error});
        }

        const updatedDesignation = await Designation.findByIdAndUpdate(id, value, {new: true});

        if (!updatedDesignation) {
            return res.status(404).json({status: 404, message: 'Designation not Found' });
        }

        res.status(200).json({status: 200, data: updatedDesignation, message: 'Designation Updated Successfully'});

    }catch(err) {
         res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
         });
    }
};

const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status (404).json({status: 404, error: 'Invalid Designation Id'});
        }

        const deletedDesignation = await Designation.findByIdAndDelete(id);

        if (!deletedDesignation) {
            return res.status(404).json({status: 404, message: 'Designation not Found'});
        }

        res.status(200).json({status: 200, message: 'Designation deleted successfully'});
        
    }catch (err) {
       res.status (404).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
       });

    }
};

module.exports = {getAllDesignations, getDesignationById, createDesignation, updateDesignation, deleteDesignation};