const mongoose = require('mongoose');
const crypto = require('crypto');
const axios = require('axios');

const { Payment, Order } = require('../models');
const { paymentSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const { PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET, PAYHERE_TOKENURL, PAYHERE_CREDENTIALS } = process.env;
const { financeAgg } = require('../aggregates');

const getAllPayments = async (req, res) => {
    try {
        let payment
        const { type } = req.query;

        if (type == 'paymentIds') {
            payment = await Payment.aggregate(financeAgg.aggType);
        } else {
            payment = await Payment.find();
        }

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

        const { paymentId, amount, currency, paymentMethod, paymentStatus, paymentDate, orderId, customer, amountDetail, items, customFields, description } = value;

        const payment = await Payment.create({
            paymentId,
            amount,
            currency,
            paymentMethod,
            paymentStatus,
            paymentDate,
            orderId,
            customer,
            amountDetail,
            items,
            customFields,
            description
        });

        if (!payment) {
            return res.status(400).json({ message: 'Payment could not be created' });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId }, 
            { 
                paymentId: payment._id, // Using the payment's MongoDB ObjectID
                status: 'Processing' 
            }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(400).json({ message: 'Order could not be updated with payment details' });
        }

        res.status(201).json({ data: payment, order: updatedOrder, message: 'Payment created and order updated successfully' });

    } catch (err) {
        res.status(500).json({
            message: 'Your request cannot be processed. Please try again',
            error: err.message
        });
    }
};

// const createPayment = async (req, res) => {

//     try {
//         const { value, error } = paymentSchema.validate(req.body);

//         if (error) {
//             BadRequestError(error);
//         }

//         const { amount, paymentMethod, paymentStatus, paymentDate, orderId } = value;

//         const payment = await Payment.create({
//             amount,
//             paymentMethod,
//             paymentStatus,
//             paymentDate,
//             orderId
//         });

//         if (!payment) {
//             return res.status(400).json({ message: 'Payment cannot create' });
//         }

//         res.status(201).json({ data: payment, message: 'Payment created successfully' });

//     } catch (err) {
//         res.status(400).json({
//             error: err.message,
//             message: 'Your request cannot be processed. Please try again'
//         });
//     }
// };

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

        if (localMd5sig === md5sig) {
            if (status_code === '2') {
                const payment = new Payment({
                    orderId: order_id,
                    amount: payhere_amount,
                    currency: payhere_currency,
                    status: 'Completed'
                });
                await payment.save();

                res.status(200).send('Payment received successfully');
            } else {
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
        const merchant_id = PAYHERE_MERCHANT_ID;
        const formattedAmount = (amount).toFixed(2);
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

const getAccessToken = async (req, res) => {

    const tokenUrl = PAYHERE_TOKENURL;
    const credentials = PAYHERE_CREDENTIALS;

    const headers = {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = 'grant_type=client_credentials';

    try {
        const response = await axios.post(tokenUrl, data, { headers });
        res.json({ accessToken: response.data.access_token });
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        res.status(500).json({ message: 'Failed to retrieve access token' });
    }
};

const getPaymentDetails = async (req, res) => {

    const { order_id, access_token } = req.query;
    const apiUrl = `https://sandbox.payhere.lk/merchant/v1/payment/search?order_id=${order_id}`;
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };

    try {
        const response = await axios.get(apiUrl, { headers });
        if (response.status === 200) {
            console.log("Retrieved payment details successfully:", response.data);
            res.json(response.data);
        } else {
            res.status(response.status).json({ message: 'Failed to retrieve payment details' });
        }
    } catch (error) {
        console.error('Error retrieving payment details:', error);
        res.status(500).json({ message: 'Error retrieving payment details', details: error.message });
    }
};

module.exports = { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment, paymentNotify, generateHash, getAccessToken, getPaymentDetails };