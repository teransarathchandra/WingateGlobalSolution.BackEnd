const mongoose = require('mongoose');

const { Sender } = require('../models');
const { senderSchema } = require('../schemas');

const { BadRequestError } = require('../helpers');

const getAllSender = async (req, res) => {

    try {
        const sender = await Sender.find();

        if (!sender) {
            return res.status(404).json({ status: 404, message: "Sender not found" });
        }

        res.status(200).json({ status: 200, data: sender, message: "Sender found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getSenderById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sender id" })
        }

        const sender = await Sender.findById(id);

        if (!sender) {
            return res.status(404).json({ status: 404, message: "Sender not found" });
        }

        res.status(200).json({ status: 200, data: sender, message: "Sender found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createSender = async (req, res) => {

    try {
        const { value, error } = senderSchema.senderJoiSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { name, address, contactNumber, email } = value;

        const sender = await Sender.create({
            name, address, contactNumber, email
        });

        if (!sender) {
            return res.status(400).json({ message: 'Sender cannot create' });
        }

        res.status(201).json({ data: sender, message: 'Sender created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateSender = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sender id" });
        }

        const { value, error } = senderSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedSender = await Sender.findByIdAndUpdate(id, value, { new: true });

        if (!updatedSender) {
            return res.status(404).json({ status: 404, message: "Sender not found" });
        }

        res.status(200).json({ status: 200, data: updatedSender, message: "Sender updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteSender = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sender id" });
        }
        const deletedSender = await Sender.findByIdAndDelete(id);

        if (!deletedSender) {
            return res.status(404).json({ status: 404, message: "Sender not found" });

        }
        res.status(200).json({ status: 200, message: "Sender deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllSender, getSenderById, createSender, updateSender, deleteSender };