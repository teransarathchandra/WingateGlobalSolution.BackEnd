const mongoose = require('mongoose');

const Category = require('../models/category.model');
const CategoryJoiSchema = require('../schemas/categorySchema');

const getAllCategory = async (req, res) => {

    try {
        const category = await Category.find();

        if (!category) {
            return res.status(404).json({ status: 404, message: "Category Not Found" });
        }

        res.status(200).json({ status: 200, data: category, message: "Category Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getCategoryById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.objectID.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Category Id" })
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ status: 404, message: "Category Not Found" });
        }

        res.status(200).json({ status: 200, data: category, message: "Category Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createCategory = async (req, res) => {

    try {
        const { value, error } = CategoryJoiSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { categoryId, name, description, profitRate, costPerKilo } = value;

        const category = await Category.create({
            categoryId,
            name,
            description,
            profitRate,
            costPerKilo
        });

        if (!category) {
            return res.status(400).json({ message: 'Category Cannot Create' });
        }

        res.status(201).json({ data: category, message: 'Category Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateCategory = async(req, res) =>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.objectID.isValid(id)){
            return res.status(404).json({ status: 404, error: "Invalid Category id" });
        }

        const{value , error} = Category.validate(req.body);
        
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, value, { new: true });
        
        if (!updatedCategory) {
            return res.status(404).json({ status: 404, message: "Category not found" });
        }

        res.status(200).json({ status: 200, data: updatedEmployee, message: "Category Updated Successfully" });


    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

 const deleteCategory = async (req, res) =>{

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid category id" });
        }
        const deletedCategory = await Category.findByIdAndDelete(id);

        if(!deletedCategory){
            return res.status(404).json({ status: 404, message: "Category not found" });

        }
        res.status(200).json({ status: 200, message: "Category Deleted Successfully" });

    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

 };

module.exports = { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory};