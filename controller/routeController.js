const mongoose = require('mongoose');

const Route = require('../models/route.model');
const RouteSchema = require('../schemas/routeSchema');

const getAllRoutes = async (req, res) => {

    try {
        const routes = await Route.find();

        if (!routes) {
            return res.status(404).json({ status: 404, message: "Route Not Found" });
        }

        res.status(200).json({ status: 200, data: routes, message: "Route Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getRouteById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Route Id" })
        }

        const route = await Route.findById(id);

        if (!route) {
            return res.status(404).json({ status: 404, message: "Route Not Found" });
        }

        res.status(200).json({ status: 200, data: route, message: "Route Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createRoute = async (req, res) => {

    try {
        const { value, error } = RouteSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { routeId, transportMode, distance, priority, roundTripDays, routeShippingCost, startingPortId, endingPortId} = value;

        const route = await Route.create({
            routeId,
            transportMode, 
            distance, 
            priority, 
            roundTripDays, 
            routeShippingCost, 
            startingPortId, 
            endingPortId
        });

        if (!route) {
            return res.status(400).json({ message: 'Route Cannot Create' });
        }

        res.status(201).json({ data: route, message: 'Route Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateRoute = async(req, res) =>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ status: 404, error: "Invalid Route id" });
        }

        const{value , error} = RouteSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedRoute = await Route.findByIdAndUpdate(id, value, { new: true });
        
        if (!updatedRoute) {
            return res.status(404).json({ status: 404, message: "Route not found" });
        }

        res.status(200).json({ status: 200, data: updatedRoute, message: "Route Updated Successfully" });


    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

 const deleteRoute = async (req, res) =>{

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid route id" });
        }
        const deletedRoute = await Route.findByIdAndDelete(id);

        if(!deletedRoute){
            return res.status(404).json({ status: 404, message: "Route not found" });

        }
        res.status(200).json({ status: 200, message: "Route Deleted Successfully" });

    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

 };

module.exports = { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute};