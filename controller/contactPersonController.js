const mongoose = require('mongoose');

const ContactPerson = require('../models/contactPerson.model');
const { registerSchema, updateSchema } = require('../schemas/contactPersonSchema')




const getAllContactPersons = async (req, res) => {

    try {
        const contactPerson = await ContactPerson.find();

        if (!contactPerson) {
            return res.status(404).json({ status: 404, message: "ContactPerson not found" });
        }

        res.status(200).json({ status: 200, data: contactPerson, message: "ContactPerson Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getContactPersonById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid ContactPerson id" })
        }

        const contactPerson = await ContactPerson.findById(id);

        if (!contactPerson) {
            return res.status(404).json({ status: 404, message: "ContactPerson not found" });
        }

        res.status(200).json({ status: 200, data: contactPerson, message: "ContactPerson Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};



const createContactPerson = async (req, res) => {

    try {
        const { value, error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const  { customerId, contactPerson, contactNumber,  email, } = value;

        const contactperson = await ContactPerson.create({
            customerId,
            contactPerson,
            contactNumber,
            email
        });

        if (!contactperson) {
            return res.status(400).json({ message: 'ContactPerson Cannot Create' });
        }

        res.status(201).json({ data: contactperson, message: 'ContactPerson Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateContactPerson = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid ContactPerson id" });
        }

        const { value, error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedContactPerson = await ContactPerson.findByIdAndUpdate(id, value, { new: true });
        if (!updatedContactPerson) {
            return res.status(404).json({ status: 404, message: "ContactPerson not found" });
        }

        res.status(200).json({ status: 200, data: updatedContactPerson, message: "ContactPerson Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteContactPerson = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid ContactPerson id" });
        }

        const deletedcontactPerson = await ContactPerson.findByIdAndDelete(id);
        if (!deletedcontactPerson) {
            return res.status(404).json({ status: 404, message: "ContactPerson not found" });
        }

        res.status(200).json({ status: 200, message: "ContactPerson Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


module.exports = {getAllContactPersons, getContactPersonById, createContactPerson, updateContactPerson, deleteContactPerson}
