const mongoose = require('mongoose');

const { Quotation } = require('../models');
const { quotationSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllQuotations = async (req, res) => {

    try {
        const quotation = await Quotation.find();

        if (!quotation) {
            return res.status(404).json({ status: 404, message: "Quotations not found" });
        }

        res.status(200).json({ status: 200, data: quotation, message: "Quotations found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getQuotationById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid quotation id" })
        }

        const quotation = await Quotation.findById(id);

        if (!quotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, data: quotation, message: "Quotation found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createQuotation = async (req, res) => {

    try {
        const { value, error } = quotationSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { packagingCost, routeCost, unitWeightCost, surcharge, orderId } = value;

        const quotation = await Quotation.create({
            packagingCost,
            routeCost,
            unitWeightCost,
            pickUpCost,
            surcharge,
            orderId
        });

        if (!quotation) {
            return res.status(400).json({ message: 'Quotation cannot create' });
        }

        res.status(201).json({ data: quotation, message: 'Quotation created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateQuotation = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid quotation id" });
        }

        const { value, error } = quotationSchema.validate(req.body);
        if (error) {
            BadRequestError(error);
        }

        const updatedQuotation = await Quotation.findByIdAndUpdate(id, value, { new: true });
        if (!updatedQuotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, data: updatedQuotation, message: "Quotation updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteQuotation = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid quotation id" });
        }

        const deleteQuotation = await Quotation.findByIdAndDelete(id);
        if (!deleteQuotation) {
            return res.status(404).json({ status: 404, message: "Quotation not found" });
        }

        res.status(200).json({ status: 200, message: "Quotation deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};
const calculateQuotation = async (req, res) => {

    try {
        const { value, error } = req.body;

        if (error) {
            BadRequestError(error);
        }

       // const { packagingCost, routeCost, unitWeightCost, surcharge, orderId } = value;

        // const amount = await Quotation.create({
        //     packagingCost,
        //     routeCost,
        //     unitWeightCost,
        //     pickUpCost,
        //     surcharge,
        //     orderId
        // });
        const amount = 500;

        if (!amount) {
            return res.status(400).json({ message: 'Amount cannot calculate' });
        }

        res.status(201).json({ data: amount, message: 'Quotation created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllQuotations, getQuotationById, createQuotation, updateQuotation, deleteQuotation , calculateQuotation};