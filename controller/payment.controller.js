const mongoose = require('mongoose');

const Payment = require('../models/payment.model');
const PaymentSchema = require('../schemas/payment.schema')

const getAllPayments = async (req, res) => {
    try {
        const payment = await Payment.find();

        if (!payment) {
            return res.status(404).json({ status: 404, message: "Payments not found" });
        }

        res.status(200).json({ status: 200, data: payment, message: "Payments Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getPaymentById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid payment id" })
        }

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, data: payment, message: "Payment Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createPayment = async (req, res) => {

    try {
        const { value, error } = PaymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
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
            return res.status(400).json({ message: 'Payment Cannot Create' });
        }

        res.status(201).json({ data: payment, message: 'Payment Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updatePayment = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid payment id" });
        }

        const { value, error } = PaymentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(id, value, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, data: updatedPayment, message: "Payment Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deletePayment = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid payment id" });
        }

        const deletePayment = await Payment.findByIdAndDelete(id);
        if (!deletePayment) {
            return res.status(404).json({ status: 404, message: "Payment not found" });
        }

        res.status(200).json({ status: 200, message: "Payment Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment };