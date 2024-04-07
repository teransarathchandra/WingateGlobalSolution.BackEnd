const mongoose = require('mongoose');

const { Category } = require('../models');
const { categorySchema } = require('../schemas');

const getAllCategory = async (req, res) => {

    try {
        const category = await Category.find();

        if (!category) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        }

        res.status(200).json({ status: 200, data: category, message: "Category found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getCategoryById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid category id" })
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        }

        res.status(200).json({ status: 200, data: category, message: "Category found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createCategory = async (req, res) => {

    try {
        const { value, error } = categorySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { name, description, costPerKilo } = value;

        const category = await Category.create({
            name,
            description,
                    costPerKilo
        });

        if (!category) {
            return res.status(400).json({ message: 'Category cannot create' });
        }

        res.status(201).json({ data: category, message: 'Category created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid category id" });
        }

        const { value, error } = categorySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, value, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        }

        res.status(200).json({ status: 200, data: updatedCategory, message: "Category updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid category id" });
        }
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ status: 404, message: "Category not found" });

        }
        res.status(200).json({ status: 200, message: "Category deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory };