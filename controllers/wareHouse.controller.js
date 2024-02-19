const mongoose = require('mongoose');

const { Warehouse } = require('../models');
const { wareHouseSchema } = require('../schemas');

const getAllWarehouse = async (req, res) => {

    try {
        const warehouse = await Warehouse.find();

        if (!warehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse not found" });
        }

        res.status(200).json({ status: 200, data: warehouse, message: "Warehouse found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getWarehouseById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid warehouse id" })
        }

        const warehouse = await Warehouse.findById(id);

        if (!warehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse not found" });
        }

        res.status(200).json({ status: 200, data: warehouse, message: "Warehouse found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createWarehouse = async (req, res) => {

    try {
        const { value, error } = wareHouseSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { warehouseId, location, storageCapacity, availability, warehouseManagerId, countryId } = value;

        const warehouse = await Warehouse.create({
            warehouseId,
            location,
            storageCapacity,
            availability,
            warehouseManagerId,
            countryId
        });

        if (!warehouse) {
            return res.status(400).json({ message: 'Warehouse cannot create' });
        }

        res.status(201).json({ data: warehouse, message: 'Warehouse created successfully' });
    } catch (err) {
        res.status(400).json({
            eerror: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid warehouse id" });
        }

        const { value, error } = wareHouseSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, value, { new: true });

        if (!updatedWarehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse not found" });
        }

        res.status(200).json({ status: 200, data: updatedWarehouse, message: "Warehouse updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteWarehouse = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid warehouse id" });
        }
        const deletedWarehouse = await Warehouse.findByIdAndDelete(id);

        if (!deletedWarehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse not found" });

        }
        res.status(200).json({ status: 200, message: "Warehouse deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllWarehouse, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse };