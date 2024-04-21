const mongoose = require('mongoose');

const { WareHouse } = require('../models');
const { wareHouseSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');
const { warehouseAgg } = require('../aggregates');

const getAllWarehouse = async (req, res) => {

    try {
        let warehouse
        const { type } = req.query;

        if( type == 'warehouseId'){
            warehouse = await WareHouse.aggregate(warehouseAgg.aggTypeTwo);
        }else {
            warehouse = await WareHouse.find();
        }
        //const warehouse = await WareHouse.find();

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

        const warehouse = await WareHouse.findById(id);

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
            BadRequestError(error);
        }

        const { storageCapacity, availability,location } = value;

        const warehouse = await WareHouse.create({
            storageCapacity,
            availability,
            location
        });

        if (!warehouse) {
            return res.status(400).json({ message: 'Warehouse cannot create' });
        }

        res.status(201).json({ data: warehouse, message: 'Warehouse created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
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
            BadRequestError(error);
        }

        const updatedWarehouse = await WareHouse.findByIdAndUpdate(id, value, { new: true });

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
        const deletedWarehouse = await WareHouse.findByIdAndDelete(id);

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