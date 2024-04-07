const mongoose = require('mongoose');

const { Flight } = require('../models');
const { flightSchema } = require('../schemas');
const { transportAgg } = require('../aggregates');

const getAllFlights = async (req, res) => {

    try {

        let flight 
         const { type } = req.query;
         if( type == 'airlineIds'){
            flight = await Flight.aggregate(transportAgg.aggFlight);
        }else {
            flight = await Flight.find();
        }

        

        if (!flight) {
            res.status(404).json({ status: 404, message: 'Flight not found' });
        }

        res.status(200).json({ status: 200, data: flight, message: 'Flight found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const getFlightById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid flight id' });
        }

        const flight = await Flight.findById(id);

        if (!flight) {
            return res.status(404).json({ status: 404, message: 'Flight not found' });
        }

        res.status(200).json({ status: 200, data: flight, message: 'Flight found successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

const createFlight = async (req, res) => {

    try {
        const { value, error } = flightSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { flightId, type, routeCostPerKilo, arrival, arrivalTime, departure, departureTime, AirlineId } = value;

        const flight = await Flight.create({
            flightId,
            type,
            routeCostPerKilo,
            arrival,
            arrivalTime,
            departure,
            departureTime,
            AirlineId


        })

        if (!flight) {
            return res.status(400).json({ message: 'Flight cannot create' });
        }

        res.status(201).json({ data: flight, message: 'Flight created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateFlight = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid flight id' });
        }

        const { value, error } = flightSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedFlight = await Flight.findByIdAndUpdate(id, value, { new: true });

        if (!updatedFlight) {
            return res.status(404).json({ status: 404, message: 'Flight not found' });
        }

        res.status(200).json({ status: 200, data: updatedFlight, message: 'Flight updated successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteFlight = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid flight id' });
        }

        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) {
            return res.status(404).json({ status: 404, message: 'Flight not found' });
        }

        res.status(200).json({ status: 200, message: 'Flight deleted successfully' });

    } catch (err) {
        res.status(404).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });

    }
};

module.exports = { createFlight, getAllFlights, getFlightById, updateFlight, deleteFlight };