const mongoose = require('mongoose');

const Bulk = require('../models/bulk.model');
const BulkSchema = require ('../schemas/bulkSchema');

const getAllBulks = async (req, res) => {

    try {

        const bulk = await Bulk.find();

        if (!bulk){
            res.status(404).json({ status: 404, message: 'Bulk not found' });
        }

        res.status(200).json({status: 200, data: bulk, message: 'Bulk Found'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const getBulkById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({status: 400, error: 'Invalid Bulk Id'});
        }

        const bulk = await Bulk.findById(id);

        if (!bulk) {
            return res.status(404).json({status: 404, message: 'Bulk not Found'});
        }

        res.status(200).json({status: 200, data: bulk, message: 'Bulk Found'});
    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const createBulk = async (req, res) => {

    try {
        const { value, error } = BulkSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { bulkId, currentLocation, arrivedTime, status, vehicleAssignedDate, vehicleId } = value;

        const bulk = await Bulk.create({
            bulkId,
            currentLocation,
            arrivedTime,
            status,
            vehicleAssignedDate,
            vehicleId

        })

        if (!bulk) {
            return res.status(400).json ({message : 'Bulk Cannot Create'});
        }

        res.status(201).json({data: Bulk, message: 'Bulk Created Successfully'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });
    }
};

const updateBulk = async (req, res) => {
    try {
        const { id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid Bulk Id' });
        }

        const { value, error } = BulkSchema.validate(req.body);

        if (error) {
            return res.status(400).json({status: 400, error: error});
        }

        const updatedBulk = await Bulk.findByIdAndUpdate(id, value, {new: true});

        if (!updatedBulk) {
            return res.status(404).json({status: 404, message: 'Bulk not Found' });
        }

        res.status(200).json({status: 200, data: updatedBulk, message: 'Bulk Updated Successfully'});

    }catch(err) {
         res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
         });
    }
};

const deleteBulk = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status (404).json({status: 404, error: 'Invalid Bulk Id'});
        }

        const deletedBulk = await Bulk.findByIdAndDelete(id);

        if (!deletedBulk) {
            return res.status(404).json({status: 404, message: 'Bulk not Found'});
        }

        res.status(200).json({status: 200, message: 'Bulk deleted successfully'});
        
    }catch (err) {
       res.status (404).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
       });

    }
};

module.exports = {createBulk, getAllBulks, getBulkById, updateBulk, deleteBulk};