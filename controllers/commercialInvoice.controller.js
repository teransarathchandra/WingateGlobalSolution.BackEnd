const mongoose = require('mongoose');

const { CommercialInvoice } = require('../models');
const { commercialInvoiceSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllCommercialInvoice = async (req, res) => {

    try {
        const commercialInvoice = await CommercialInvoice.find();

        if (!commercialInvoice) {
            return res.status(404).json({ status: 404, message: "Commercial Invoice not found" });
        }

        res.status(200).json({ status: 200, data: commercialInvoice, message: "Commercial Invoice found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getCommercialInvoiceById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Commercial Invoice id" })
        }

        const commercialInvoice = await CommercialInvoice.findById(id);

        if (!commercialInvoice) {
            return res.status(404).json({ status: 404, message: "Commercial Invoice not found" });
        }

        res.status(200).json({ status: 200, data: commercialInvoice, message: "Commercial Invoice found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createCommercialInvoice = async (req, res) => {

    try {
        const { value, error } = commercialInvoiceSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { orderId, documentPath } = value;

        const commercialInvoice = await CommercialInvoice.create({
            orderId,
            documentPath
        });

        if (!commercialInvoice) {
            return res.status(400).json({ message: 'Commercial Invoice cannot create' });
        }

        res.status(201).json({ data: commercialInvoice, message: 'Commercial Invoice created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateCommercialInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Commercial Invoice id" });
        }

        const { value, error } = commercialInvoiceSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedCommercialInvoice = await CommercialInvoice.findByIdAndUpdate(id, value, { new: true });

        if (!updatedCommercialInvoice) {
            return res.status(404).json({ status: 404, message: "Commercial Invoice not found" });
        }

        res.status(200).json({ status: 200, data: updatedCommercialInvoice, message: "Commercial Invoice updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteCommercialInvoice = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Commercial Invoice id" });
        }
        const deletedCommercialInvoice = await CommercialInvoice.findByIdAndDelete(id);

        if (!deletedCommercialInvoice) {
            return res.status(404).json({ status: 404, message: "Commercial Invoice not found" });

        }
        res.status(200).json({ status: 200, message: "Commercial Invoice deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllCommercialInvoice, getCommercialInvoiceById, createCommercialInvoice, updateCommercialInvoice, deleteCommercialInvoice };