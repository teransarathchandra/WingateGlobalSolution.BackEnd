const mongoose = require('mongoose');

const { Item } = require('../models');
const { itemSchema } = require('../schemas')

const getAllItems = async (req, res) => {

    try {
        const item = await Item.find();

        if (!item) {
            return res.status(404).json({ status: 404, message: "Items not found" });
        }

        res.status(200).json({ status: 200, data: item, message: "Items found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getItemById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid item id" })
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, data: item, message: "Item found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createItem = async (req, res) => {

    try {
        const { value, error } = itemSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { itemId, name, description, weight, itemValue, orderId, categoryId } = value;

        const item = await Item.create({
            itemId,
            name,
            description,
            weight,
            itemValue,
            orderId,
            categoryId
        });

        if (!item) {
            return res.status(400).json({ message: 'Item cannot create' });
        }

        res.status(201).json({ data: item, message: 'Item created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateItem = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid item id" });
        }

        const { value, error } = itemSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedItem = await Item.findByIdAndUpdate(id, value, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, data: updatedItem, message: "Item updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteItem = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid item id" });
        }

        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, message: "Item deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };