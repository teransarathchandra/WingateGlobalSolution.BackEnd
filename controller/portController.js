const mongoose = require('mongoose');

const Port = require('../models/port.model');
const PortSchema = require ('../schemas/portSchema');

const getAllPorts = async (req, res) => {

    try {

        const vehicle = await Port.find();

        if (!vehicle){
            res.status(404).json({ status: 404, message: 'Port not found' });
        }

        res.status(200).json({status: 200, data: vehicle, message: 'Port Found'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again',
            message: err.message
        });
    }

};

const createPort = async (req, res) => {

    try {
        const { value, error } = PortSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { portId, portCode, name, type, countryId } = value;

        const port = await Port.create({
            portId,
            portCode,
            name,
            type,
            countryId
        })

        if (!port) {
            return res.status(400).json ({message : 'Port Cannot Create'});
        }

        res.status(201).json({data: port, message: 'Port Created Successfully'});

    }catch(err) {
        res.status(400).json({
            error: 'Your request cannot be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = {createPort, getAllPorts};