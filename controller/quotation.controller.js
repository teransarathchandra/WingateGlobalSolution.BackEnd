const mongoose = require('mongoose');

const Quotation = require('../models/quotation.model');
const QuotationSchema = require('../schemas/quotation.schema')

const getAllQuotations = async (req, res) => {

    try {
        const quotation = await Quotation.find();

        if (!quotation) {
            return res.status(404).json({ status: 404, message: "Quotations not found" });
        }

        res.status(200).json({ status: 200, data: quotation, message: "Quotations Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getQuotationById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid quotation id" })
        }

        const quotation = await Quotation.findById(id);

        if (!quotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, data: quotation, message: "Quotation Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createQuotation = async (req, res) => {

    try {
        const { value, error } = QuotationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { quotationId, packagingCost, routeCost, unitWeightCost, surcharge, orderId } = value;

        const quotation = await Quotation.create({
            quotationId,
            packagingCost,
            routeCost,
            unitWeightCost,
            surcharge,
            orderId
        });

        if (!quotation) {
            return res.status(400).json({ message: 'Quotation Cannot Create' });
        }

        res.status(201).json({ data: quotation, message: 'Quotation Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateQuotation = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid quotation id" });
        }

        const { value, error } = QuotationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedQuotation = await Quotation.findByIdAndUpdate(id, value, { new: true });
        if (!updatedQuotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, data: updatedQuotation, message: "Quotation Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteQuotation = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid quotation id" });
        }

        const deleteQuotation = await Quotation.findByIdAndDelete(id);
        if (!deleteQuotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, message: "Quotation Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllQuotations, getQuotationById, createQuotation, updateQuotation, deleteQuotation };