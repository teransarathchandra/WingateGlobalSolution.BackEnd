const mongoose = require('mongoose');

const { PackageType } = require('../models');
const { packageTypeSchema } = require('../schemas');

const getAllPackageType = async (req, res) => {

    try {
        const packageType = await PackageType.find();

        if (!packageType) {
            return res.status(404).json({ status: 404, message: "Package Type not found" });
        }

        res.status(200).json({ status: 200, data: packageType, message: "Package Type found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getPackageTypeById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Package Type id" })
        }

        const packageType = await PackageType.findById(id);

        if (!packageType) {
            return res.status(404).json({ status: 404, message: "Package Type not found" });
        }

        res.status(200).json({ status: 200, data: packageType, message: "Package Type found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createPackageType = async (req, res) => {

    try {
        const { value, error } = packageTypeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { packageName, packagingCost, width, length, height, maximumWeight, maximumHeight, type } = value;

        const packageType = await PackageType.create({
            packageName, 
            packagingCost, 
            width, 
            length, 
            height, 
            maximumWeight, 
            maximumHeight, 
            type
        });

        if (!packageType) {
            return res.status(400).json({ message: 'Package Type cannot create' });
        }

        res.status(201).json({ data: packageType, message: 'Package Type created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updatePackageType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Package Type id" });
        }

        const { value, error } = packageTypeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedPackageType = await PackageType.findByIdAndUpdate(id, value, { new: true });

        if (!updatedPackageType) {
            return res.status(404).json({ status: 404, message: "Package Type not found" });
        }

        res.status(200).json({ status: 200, data: updatedPackageType, message: "Package Type updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deletePackageType = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid Package Type id" });
        }
        const deletedPackageType = await PackageType.findByIdAndDelete(id);

        if (!deletedPackageType) {
            return res.status(404).json({ status: 404, message: "Package Type not found" });

        }
        res.status(200).json({ status: 200, message: "Package Type deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllPackageType, getPackageTypeById, createPackageType, updatePackageType, deletePackageType };