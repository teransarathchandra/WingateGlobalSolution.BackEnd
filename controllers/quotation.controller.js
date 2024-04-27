const mongoose = require('mongoose');

const { Quotation } = require('../models');
const { quotationSchema} = require('../schemas');
const { BadRequestError } = require('../helpers');
//const getCostPerKilo =  require('../services/calculateAmount/');

const calculateQuotation = async (req, res) => {

    try {
        
        let amount = 500;
      
        const { value , error}  = quotationSchema.calculatingAmountJoiSchema.validate(req.body);

        if (error) {
            return res.status(404).json({ status: 404, message: "Error" });
        }
        const { packageCount, packageTypeId, categoryId, weight } = value;
      
        const packagingCost =  100 
        const routeCost  =  15000 
        const unitWeightCost  =  500 
        //const unitWeightCost  =  getCategoryById(categoryId).costPerKilo;
        //const unitWeightCost = getCostPerKilo(categoryId);
        amount = (packagingCost * packageCount) + (unitWeightCost * weight ) + (routeCost);
        const surcharge = amount * 10 / 100 ;

        const fullAmount = amount + surcharge ;

        return res.status(200).json({ status: 200, data: fullAmount, message: "Amount calculated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

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
        console.log("Test");
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
        const { value, error } = quotationSchema.quotationJoiSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { packagingCost, routeCost, unitWeightCost, pickUpCost, surcharge, orderId } = value;

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

        const { value, error } = quotationSchema.quotationJoiSchema.validate(req.body);

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


module.exports = { getAllQuotations, getQuotationById, createQuotation, updateQuotation, deleteQuotation, calculateQuotation };