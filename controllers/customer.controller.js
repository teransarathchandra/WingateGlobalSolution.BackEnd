const mongoose = require('mongoose');

const { Customer } = require('../models');
const { customerSchema } = require('../schemas')
const { BadRequestError } = require('../helpers');

const getAllCustomers = async (req, res) => {

    try {
        const customer = await Customer.find();

        if (!customer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: customer, message: "Customer found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getCustomerById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid customer id" })
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: customer, message: "Customer found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createCustomer = async (req, res) => {

    try {
        const { value, error } = customerSchema.registerSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { priorityLevel, birthday, customerId } = value;

        const customer = await Customer.create({
            priorityLevel,
            birthday,
            customerId
        });

        if (!customer) {
            return res.status(400).json({ message: 'Customer cannot create' });
        }

        res.status(201).json({ data: customer, message: 'Customer created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid customer id" });
        }

        const { value, error } = customerSchema.updateSchema.validate(req.body);
        if (error) {
            BadRequestError(error);
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, value, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, data: updatedCustomer, message: "Customer updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid customer id" });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ status: 404, message: "Customer not found" });
        }

        res.status(200).json({ status: 200, message: "Customer deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


module.exports = { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer }
