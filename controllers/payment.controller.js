const mongoose = require('mongoose');

const { Payment } = require('../models');
const { paymentSchema } = require('../schemas')

const getAllPayments = async (req, res) => {
    try {
        const payment = await Payment.find();

        if (!payment) {
            return res.status(404).json({ status: 404, message: "Payments not found" });
        }

        res.status(200).json({ status: 200, data: payment, message: "Payments found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getPaymentById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment id" })
        }

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, data: payment, message: "Payment found successfully" });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createPayment = async (req, res) => {

    try {
        const { value, error } = paymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { paymentId, paymentDescription, amount, paymentMethod, paymentStatus, orderId } = value;

        const payment = await Payment.create({
            paymentId,
            paymentDescription,
            amount,
            paymentMethod,
            paymentStatus,
            orderId
        });

        if (!payment) {
            return res.status(400).json({ message: 'Payment cannot create' });
        }

        res.status(201).json({ data: payment, message: 'Payment created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updatePayment = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment id" });
        }

        const { value, error } = paymentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(id, value, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, data: updatedPayment, message: "Payment updated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deletePayment = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid payment id" });
        }

        const deletePayment = await Payment.findByIdAndDelete(id);
        if (!deletePayment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, message: "Payment deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment };