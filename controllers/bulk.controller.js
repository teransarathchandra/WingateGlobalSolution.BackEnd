const mongoose = require('mongoose');

const { Bulk } = require('../models');
const { bulkSchema } = require('../schemas');
const { transportAgg } = require('../aggregates');
const { BadRequestError } = require('../helpers');

const getAllBulks = async (req, res) => {

    try {
        let bulk
        const { type } = req.query;

        if (type == 'bulkIds') {
            bulk = await Bulk.aggregate(transportAgg.aggType);
        } else {
            bulk = await Bulk.find();
        }

        if (!bulk) {
            res.status(404).json({ status: 404, message: 'Bulk not found' });
        }

        res.status(200).json({ status: 200, data: bulk, message: 'Bulk found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};
const getLastAddedBulk = async (req, res) => {
    try {
        let lastBulk;
        const { type } = req.query;

        if (type == 'lastBulkIds') {
            lastBulk = await Bulk.aggregate(transportAgg.aggLastBulk).sort({ createdDate: 1 }).limit(1);
        } else {
            lastBulk = await Bulk.findOne().sort({ createdDate: 1 });
        }


        if (!lastBulk) {
            return res.status(404).json({ status: 404, message: 'No bulk found' });
        }

        res.status(200).json({ status: 200, data: lastBulk, message: 'Last added bulk found successfully' });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const getBulkById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid bulk id' });
        }

        const bulk = await Bulk.findById(id);

        if (!bulk) {
            return res.status(404).json({ status: 404, message: 'Bulk not found' });
        }

        res.status(200).json({ status: 200, data: bulk, message: 'Bulk found successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const createBulk = async (req, res) => {

    try {
        const { value, error } = bulkSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { currentLocation, arrivedTime, status, destinationCountry, flightId, masterAirwayBillId, category, priority } = value;

        const bulk = await Bulk.create({
            currentLocation,
            arrivedTime,
            status,
            destinationCountry,
            flightId,
            masterAirwayBillId,
            category,
            priority


        })

        if (!bulk) {
            return res.status(400).json({ message: 'Bulk cannot create' });
        }

        res.status(201).json({ data: bulk, message: 'Bulk created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateBulk = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid bulk id' });
        }

        const { value, error } = bulkSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedBulk = await Bulk.findByIdAndUpdate(id, value, { new: true });

        if (!updatedBulk) {
            return res.status(404).json({ status: 404, message: 'Bulk not found' });
        }

        res.status(200).json({ status: 200, data: updatedBulk, message: 'Bulk updated successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteBulk = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid bulk id' });
        }

        const deletedBulk = await Bulk.findByIdAndDelete(id);

        if (!deletedBulk) {
            return res.status(404).json({ status: 404, message: 'Bulk not found' });
        }

        res.status(200).json({ status: 200, message: 'Bulk deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });

    }
};

module.exports = { createBulk, getAllBulks, getBulkById, updateBulk, deleteBulk, getLastAddedBulk };