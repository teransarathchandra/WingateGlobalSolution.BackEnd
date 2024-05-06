const mongoose = require('mongoose');

const { Reminder } = require('../models');
const { reminderSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllReminder = async (req, res) => {

    try {
        const reminder = await Reminder.find();

        if (!reminder) {
            return res.status(404).json({ status: 404, message: "Reminder not found" });
        }

        res.status(200).json({ status: 200, data: reminder, message: "Reminder found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getReminderById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid reminder id" })
        }

        const reminder = await Reminder.findById(id);

        if (!reminder) {
            return res.status(404).json({ status: 404, message: "Reminder not found" });
        }

        res.status(200).json({ status: 200, data: reminder, message: "Reminder found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createReminder = async (req, res) => {

    try {
        const { value, error } = reminderSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { reminderType, reminderDescription, reminderDate, offer, userId } = value;

        const reminder = await Reminder.create({
            reminderType,
            reminderDescription,
            reminderDate,
            offer,
            userId
        });

        if (!reminder) {
            return res.status(400).json({ message: 'Reminder cannot create' });
        }

        res.status(201).json({ data: reminder, message: 'Reminder created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateReminder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid reminder id" });
        }

        const { value, error } = reminderSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedReminder = await Reminder.findByIdAndUpdate(id, value, { new: true });

        if (!updatedReminder) {
            return res.status(404).json({ status: 404, message: "Reminder not found" });
        }

        res.status(200).json({ status: 200, data: updatedReminder, message: "Reminder updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteReminder = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid reminder id" });
        }
        const deletedReminder = await Reminder.findByIdAndDelete(id);

        if (!deletedReminder) {
            return res.status(404).json({ status: 404, message: "Reminder not found" });

        }
        res.status(200).json({ status: 200, message: "Reminder deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllReminder, getReminderById, createReminder, updateReminder, deleteReminder };