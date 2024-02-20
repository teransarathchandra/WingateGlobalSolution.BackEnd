const mongoose = require('mongoose');

const { Sales } = require('../models');
const { salesSchema } = require('../schemas');

const getAllSales = async (req, res) => {

    try {
        const sale = await Sales.find();

        if (!sale) {
            return res.status(404).json({ status: 404, message: "Sales not found" });
        }

        res.status(200).json({ status: 200, data: sale, message: "Sales found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getSalesById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sale id" })
        }

        const sale = await Sales.findById(id);

        if (!sale) {
            return res.status(404).json({ status: 404, message: "Sale not found" });
        }

        res.status(200).json({ status: 200, data: sale, message: "Sale found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createSales = async (req, res) => {

    try {
        const { value, error } = salesSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { description, amount, status, salesDate, salesPersonId, customerId } = value;

        const sale = await Sales.create({
            description,
            amount,
            status,
            salesDate,
            salesPersonId,
            customerId
        });

        if (!sale) {
            return res.status(400).json({ message: 'Sale cannot create' });
        }

        res.status(201).json({ data: sale, message: 'Sale created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateSales = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sale id" });
        }

        const { value, error } = salesSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedSales = await Sales.findByIdAndUpdate(id, value, { new: true });

        if (!updatedSales) {
            return res.status(404).json({ status: 404, message: "Sale not found" });
        }

        res.status(200).json({ status: 200, data: updatedSales, message: "Sale updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteSales = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid sale id" });
        }
        const deletedSales = await Sales.findByIdAndDelete(id);

        if (!deletedSales) {
            return res.status(404).json({ status: 404, message: "Sale not found" });

        }
        res.status(200).json({ status: 200, message: "Sale deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllSales, getSalesById, createSales, updateSales, deleteSales };