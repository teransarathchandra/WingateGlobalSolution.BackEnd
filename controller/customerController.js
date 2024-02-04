const mongoose = require('mongoose');

const Customer = require('../models/customer.model');
const { registerSchema, updateSchema } = require('../schemas/customerSchema')
const BadRequestError = require('../helpers/BadRequestError');





const getAllCustomers = async (req, res) => {

    try {
        const customer = await Customer.find();

        if (!customer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: customer, message: "Customer Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getCustomerById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid customer id" })
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: customer, message: "Customer Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};



const createCustomer = async (req, res) => {

    try {
        const { value, error } = registerSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { priorityLevel, customerId } = value;

        const customer = await Customer.create({
            priorityLevel,
            customerId
        });

        if (!customer) {
            return res.status(400).json({ message: 'Customer Cannot Create' });
        }

        res.status(201).json({ data: customer, message: 'Customer Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid customer id" });
        }

        const { value, error } = updateSchema.validate(req.body);
        if (error) {
            BadRequestError(error);
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, value, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: updatedCustomer, message: "Customer Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Customer id" });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deleteCustomer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, message: "Customer Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


module.exports = { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer }
