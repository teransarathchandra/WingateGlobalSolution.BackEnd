const mongoose = require('mongoose');
const crypto = require('crypto');

const { Payment } = require('../models');
const { paymentSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET } = process.env;

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
            BadRequestError(error);
        }

        const { paymentDescription, amount, paymentMethod, paymentStatus, orderId } = value;

        const payment = await Payment.create({
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
            BadRequestError(error);
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

const paymentNotify = async (req, res) => {

    try {

        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
        } = req.body;

        const merchant_secret = PAYHERE_MERCHANT_SECRET;

        const localMd5sig = crypto.createHash('md5').update(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase()
        ).digest('hex').toUpperCase();
        // Check if the local hash matches the hash from PayHere
        if (localMd5sig === md5sig) {
            // Hash match, valid notification
            if (status_code === '2') { // Check the PayHere documentation for correct status codes
                // Payment was successful
                // Process the successful payment, e.g., update the database
                const payment = new Payment({
                    orderId: order_id,
                    amount: payhere_amount,
                    currency: payhere_currency,
                    status: 'Completed'
                });
                await payment.save();

                res.status(200).send('Payment received successfully');
            } else {
                // Payment failed or was cancelled
                // Handle payment failure, e.g., update the database
                const payment = new Payment({
                    orderId: order_id,
                    amount: payhere_amount,
                    currency: payhere_currency,
                    status: 'Failed'
                });
                await payment.save();

                res.status(200).send('Payment failed or cancelled');
            }
        } else {
            // Hash does not match, invalid notification
            res.status(400).send('MD5 signature does not match');
        }

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const generateHash = async (req, res) => {

    try {

        const { order_id, amount, currency } = req.body;

        const merchant_secret = PAYHERE_MERCHANT_SECRET;
        const merchant_id = PAYHERE_MERCHANT_ID
        const formattedAmount = (amount).toFixed(2); // Ensure the amount is in the correct format
        const hashSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();
        const hashString = `${merchant_id}${order_id}${formattedAmount}${currency}${hashSecret}`;
        const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

        res.status(200).json({ status: 200, hash, message: "Hash generated successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

module.exports = { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment, paymentNotify, generateHash };