const mongoose = require('mongoose');

const { Airline } = require('../models');
const { airlineSchema } = require('../schemas');

const getAllAirlines = async (req, res) => {

    try {

        const airline = await Airline.find();

        if (!airline) {
            res.status(404).json({ status: 404, message: 'Airline not found' });
        }

        res.status(200).json({ status: 200, data: airline, message: 'Airline found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const getAirlineById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid Airline id' });
        }

        const airline = await Airline.findById(id);

        if (!airline) {
            return res.status(404).json({ status: 404, message: 'Airline not found' });
        }

        res.status(200).json({ status: 200, data: airline, message: 'Airline found successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const createAirline = async (req, res) => {

    try {
        const { value, error } = airlineSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { airlineId, code, name } = value;

        const airline = await Airline.create({
            
            airlineId,
            code, 
            name

        })

        if (!airline) {
            return res.status(400).json({ message: 'Airline cannot create' });
        }

        res.status(201).json({ data: airline, message: 'Airline created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateAirline = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid airline id' });
        }

        const { value, error } = airlineSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedAirline = await Airline.findByIdAndUpdate(id, value, { new: true });

        if (!updatedAirline) {
            return res.status(404).json({ status: 404, message: 'Airline not found' });
        }

        res.status(200).json({ status: 200, data: updatedAirline, message: 'Airline updated successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteAirline = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid airline id' });
        }

        const deletedAirline = await Airline.findByIdAndDelete(id);

        if (!deletedAirline) {
            return res.status(404).json({ status: 404, message: 'Airline not found' });
        }

        res.status(200).json({ status: 200, message: 'Airline deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });

    }
};

module.exports = { createAirline, getAllAirlines, getAirlineById, updateAirline, deleteAirline };