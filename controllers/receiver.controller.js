const mongoose = require('mongoose');

const { Receiver } = require('../models');
const { receiverSchema } = require('../schemas');

const { BadRequestError } = require('../helpers');

const getAllReceiver = async (req, res) => {

    try {
        const receiver = await Receiver.find();

        if (!receiver) {
            return res.status(404).json({ status: 404, message: "Receiver not found" });
        }

        res.status(200).json({ status: 200, data: receiver, message: "Receiver found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getReceiverById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid receiver id" })
        }

        const receiver = await Receiver.findById(id);

        if (!receiver) {
            return res.status(404).json({ status: 404, message: "Receiver not found" });
        }

        res.status(200).json({ status: 200, data: receiver, message: "Receiver found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createReceiver = async (req, res) => {

    try {
        const { value, error } = receiverSchema.createSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { name, address, contactNumber, email } = value;

        const receiver = await Receiver.create({
            name, address, contactNumber, email
        });

        if (!receiver) {
            return res.status(400).json({ message: 'Receiver cannot create' });
        }

        res.status(201).json({ data: receiver, message: 'Receiver created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateReceiver = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid receiver id" });
        }

        const { value, error } = receiverSchema.updateSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedReceiver = await Receiver.findByIdAndUpdate(id, value, { new: true });

        if (!updatedReceiver) {
            return res.status(404).json({ status: 404, message: "Receiver not found" });
        }

        res.status(200).json({ status: 200, data: updatedReceiver, message: "Receiver updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteReceiver = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid receiver id" });
        }
        const deletedReceiver = await Receiver.findByIdAndDelete(id);

        if (!deletedReceiver) {
            return res.status(404).json({ status: 404, message: "Receiver not found" });

        }
        res.status(200).json({ status: 200, message: "Receiver deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllReceiver, getReceiverById, createReceiver, updateReceiver, deleteReceiver };