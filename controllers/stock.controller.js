const mongoose = require('mongoose');

const { Stock } = require('../models');
const { stockSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllStocks = async (req, res) => {

    try {
        const stock = await Stock.find();

        if (!stock) {
            return res.status(404).json({ status: 404, message: "Stock not found" });
        }

        res.status(200).json({ status: 200, data: stock, message: "Stock found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getStockById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid stock id" })
        }

        const stock = await Stock.findById(id);

        if (!stock) {
            return res.status(404).json({ status: 404, message: "Stock not found" });
        }

        res.status(200).json({ status: 200, data: stock, message: "Stock found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createStock = async (req, res) => {

    try {
        const { value, error } = stockSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { city, country, warehouseId, bulkId } = value;

        const stock = await Stock.create({
            city, 
            country, 
            warehouseId, 
            bulkId
        });

        if (!stock) {
            return res.status(400).json({ message: 'Stock cannot create' });
        }

        res.status(201).json({ data: stock, message: 'Stock created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateStock = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid stock id" });
        }

        const { value, error } = stockSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedStock = await Stock.findByIdAndUpdate(id, value, { new: true });

        if (!updatedStock) {
            return res.status(404).json({ status: 404, message: "Stock not found" });
        }

        res.status(200).json({ status: 200, data: updatedStock, message: "Stock updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteStock = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid stock id" });
        }
        const deletedStock = await Stock.findByIdAndDelete(id);

        if (!deletedStock) {
            return res.status(404).json({ status: 404, message: "Stock not found" });

        }
        res.status(200).json({ status: 200, message: "Stock deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllStocks, getStockById, createStock, updateStock, deleteStock };