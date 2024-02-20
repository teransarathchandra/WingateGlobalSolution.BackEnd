const mongoose = require('mongoose');

const { Route } = require('../models');
const { routeSchema } = require('../schemas');

const getAllRoutes = async (req, res) => {

    try {
        const routes = await Route.find();

        if (!routes) {
            return res.status(404).json({ status: 404, message: "Route not found" });
        }

        res.status(200).json({ status: 200, data: routes, message: "Route found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getRouteById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid route id" })
        }

        const route = await Route.findById(id);

        if (!route) {
            return res.status(404).json({ status: 404, message: "Route not found" });
        }

        res.status(200).json({ status: 200, data: route, message: "Route found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createRoute = async (req, res) => {

    try {
        const { value, error } = routeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { transportMode, distance, priority, roundTripDays, routeShippingCost, startingPortId, endingPortId } = value;

        const route = await Route.create({
            transportMode,
            distance,
            priority,
            roundTripDays,
            routeShippingCost,
            startingPortId,
            endingPortId
        });

        if (!route) {
            return res.status(400).json({ message: 'Route cannot create' });
        }

        res.status(201).json({ data: route, message: 'Route created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateRoute = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid route id" });
        }

        const { value, error } = routeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedRoute = await Route.findByIdAndUpdate(id, value, { new: true });

        if (!updatedRoute) {
            return res.status(404).json({ status: 404, message: "Route not found" });
        }

        res.status(200).json({ status: 200, data: updatedRoute, message: "Route updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteRoute = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid route id" });
        }
        const deletedRoute = await Route.findByIdAndDelete(id);

        if (!deletedRoute) {
            return res.status(404).json({ status: 404, message: "Route not found" });

        }
        res.status(200).json({ status: 200, message: "Route deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute };