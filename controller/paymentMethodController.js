const mongoose = require('mongoose');

const PaymentMethod = require('../models/paymentMethod.model');
const PaymentMethodSchema = require('../schemas/paymentSchema')

const getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.find();

        if (!paymentMethod) {
            return res.status(404).json({ status: 404, message: "PaymentMethods not found" });
        }

        res.status(200).json({ status: 200, data: paymentMethod, message: "PaymentMethods Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getPaymentMethodById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid paymentMethod id" })
        }

        const paymentMethod = await PaymentMethod.findById(id);

        if (!paymentMethod) {
            return res.status(404).json({ status: 404, message: "PaymentMethod not found" });
        }

        res.status(200).json({ status: 200, data: paymentMethod, message: "PaymentMethod Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createPaymentMethod = async (req, res) => {

    try {
        const { value, error } = PaymentMethodSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { paymentMethodId, userName, amount, method } = value;

        const paymentMethod = await PaymentMethod.create({
            paymentMethodId,
            userName,
            amount,
            method,
        });

        if (!paymentMethod) {
            return res.status(400).json({ message: 'PaymentMethod Cannot Create' });
        }

        res.status(201).json({ data: paymentMethod, message: 'PaymentMethod Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updatePaymentMethod = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid paymentMethod id" });
        }

        const { value, error } = PaymentMethodSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(id, value, { new: true });
        if (!updatedPaymentMethod) {
            return res.status(404).json({ status: 404, message: "PaymentMethod not found" });
        }

        res.status(200).json({ status: 200, data: updatedPaymentMethod, message: "PaymentMethod Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};const deletePaymentMethod = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid paymentMethod id" });
        }

        const deletePaymentMethod = await PaymentMethod.findByIdAndDelete(id);
        if (!deletePaymentMethod) {
            return res.status(404).json({ status: 404, message: "PaymentMethod not found" });
        }

        res.status(200).json({ status: 200, message: "PaymentMethod Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllPaymentMethods, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod };

