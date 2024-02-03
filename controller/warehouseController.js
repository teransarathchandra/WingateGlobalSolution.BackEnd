const mongoose = require('mongoose');

const Warehouse = require('../models/warehouse.model');
const WarehouseJoiSchema = require('../schemas/warehouseSchema');

const getAllWarehouse = async (req, res) => {

    try {
        const warehouse = await Warehouse.find();

        if (!warehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse Not Found" });
        }

        res.status(200).json({ status: 200, data: warehouse, message: "Warehouse Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getWarehouseById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.objectID.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Warehouse Id" })
        }

        const warehouse = await Warehouse.findById(id);

        if (!warehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse Not Found" });
        }

        res.status(200).json({ status: 200, data: warehouse, message: "Warehouse Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createWarehouse = async (req, res) => {

    try {
        const { value, error } = WarehouseJoiSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { warehouseId, location, storageCapacity, availability, warehouseManagerId, countryId } = value;

        const warehouse = await warehouse.create({
            warehouseId,
            location,
            storageCapacity,
            availability,
            warehouseManagerId,
            countryId
        });

        if (!warehouse) {
            return res.status(400).json({ message: 'Warehouse Cannot Create' });
        }

        res.status(201).json({ data: warehouse, message: 'Warehouse Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateWarehouse = async(req, res) =>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.objectID.isValid(id)){
            return res.status(404).json({ status: 404, error: "Invalid Warehouse id" });
        }

        const{value , error} = Warehouse.validate(req.body);
        
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, value, { new: true });
        
        if (!updatedWarehouse) {
            return res.status(404).json({ status: 404, message: "Warehouse not found" });
        }

        res.status(200).json({ status: 200, data: updatedWarehouse, message: "Warehouse Updated Successfully" });


    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

 const deleteWarehouse = async (req, res) =>{

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid warehouse id" });
        }
        const deletedWarehouse = await Warehouse.findByIdAndDelete(id);

        if(!deletedWarehouse){
            return res.status(404).json({ status: 404, message: "Warehouse not found" });

        }
        res.status(200).json({ status: 200, message: "Warehouse Deleted Successfully" });

    } catch (err){
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

 };

module.exports = { getAllWarehouse, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse};