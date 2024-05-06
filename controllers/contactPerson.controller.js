const mongoose = require('mongoose');

const { ContactPerson } = require('../models');
const { contactPersonSchema } = require('../schemas')
const { BadRequestError } = require('../helpers');

const getAllContactPersons = async (req, res) => {

    try {
        const contactPerson = await ContactPerson.find();

        if (!contactPerson) {
            return res.status(404).json({ status: 404, message: "Contact Person not found" });
        }

        res.status(200).json({ status: 200, data: contactPerson, message: "Contact person found" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getContactPersonById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid contact person id" })
        }

        const contactPerson = await ContactPerson.findById(id);

        if (!contactPerson) {
            return res.status(404).json({ status: 404, message: "Contact person not found" });
        }

        res.status(200).json({ status: 200, data: contactPerson, message: "Contact person found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createContactPerson = async (req, res) => {

    try {
        const { value, error } = contactPersonSchema.registerSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { customerId, contactPerson, contactNumber, email, } = value;

        const contactperson = await ContactPerson.create({
            customerId,
            contactPerson,
            contactNumber,
            email
        });

        if (!contactperson) {
            return res.status(400).json({ message: 'Contact person cannot create' });
        }

        res.status(201).json({ data: contactperson, message: 'Contact person created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateContactPerson = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid contact person id" });
        }

        const { value, error } = contactPersonSchema.updateSchema.validate(req.body);
        if (error) {
            BadRequestError(error);
        }

        const updatedContactPerson = await ContactPerson.findByIdAndUpdate(id, value, { new: true });
        if (!updatedContactPerson) {
            return res.status(404).json({ status: 404, message: "Contact person not found" });
        }

        res.status(200).json({ status: 200, data: updatedContactPerson, message: "Contact person updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteContactPerson = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid contact person id" });
        }

        const deletedContactPerson = await ContactPerson.findByIdAndDelete(id);
        if (!deletedContactPerson) {
            return res.status(404).json({ status: 404, message: "Contact person not found" });
        }

        res.status(200).json({ status: 200, message: "Contact Person deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllContactPersons, getContactPersonById, createContactPerson, updateContactPerson, deleteContactPerson }
