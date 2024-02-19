const mongoose = require('mongoose');

const { PaymentMethod } = require('../models');
const { paymentMethodSchema } = require('../schemas')

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.find();

        if (!paymentMethod) {
            return res.status(404).json({ status: 404, message: "Payment methods not found" });
        }

        res.status(200).json({ status: 200, data: paymentMethod, message: "Payment methods found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getPaymentMethodById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment method id" })
        }

        const paymentMethod = await PaymentMethod.findById(id);

        if (!paymentMethod) {
            return res.status(404).json({ status: 404, message: "Payment method not found" });
        }

        res.status(200).json({ status: 200, data: paymentMethod, message: "Payment method found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createPaymentMethod = async (req, res) => {

    try {
        const { value, error } = paymentMethodSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { paymentMethodId, userName, amount, method } = value;

        const paymentMethod = await PaymentMethod.create({
            paymentMethodId,
            userName,
            amount,
            method,
        });

        if (!paymentMethod) {
            return res.status(400).json({ message: 'Payment method cannot create' });
        }

        res.status(201).json({ data: paymentMethod, message: 'Payment method created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updatePaymentMethod = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment method id" });
        }

        const { value, error } = paymentMethodSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(id, value, { new: true });
        if (!updatedPaymentMethod) {
            return res.status(404).json({ status: 404, message: "Payment method not found" });
        }

        res.status(200).json({ status: 200, data: updatedPaymentMethod, message: "Payment method updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}; const deletePaymentMethod = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment method id" });
        }

        const deletePaymentMethod = await PaymentMethod.findByIdAndDelete(id);
        if (!deletePaymentMethod) {
            return res.status(404).json({ status: 404, message: "Payment method not found" });
        }

        res.status(200).json({ status: 200, message: "Payment method deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllPaymentMethods, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod };

