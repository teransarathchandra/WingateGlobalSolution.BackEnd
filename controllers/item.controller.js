const mongoose = require('mongoose');

const { Item } = require('../models');
const { itemSchema } = require('../schemas')

const getAllItems = async (req, res) => {

    try {
        const item = await Item.find();

        if (!item) {
            return res.status(404).json({ status: 404, message: "Items not found" });
        }

        res.status(200).json({ status: 200, data: item, message: "Items Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getItemById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid item id" })
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, data: item, message: "Item Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createItem = async (req, res) => {

    try {
        const { value, error } = itemSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
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
            return res.status(400).json({ message: 'Item Cannot Create' });
        }

        res.status(201).json({ data: item, message: 'Item Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateItem = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid item id" });
        }

        const { value, error } = itemSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedItem = await Item.findByIdAndUpdate(id, value, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, data: updatedItem, message: "Item Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteItem = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid item id" });
        }

        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ status: 404, message: "Item not found" });
        }

        res.status(200).json({ status: 200, message: "Item Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };