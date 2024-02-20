const mongoose = require('mongoose');

const { Order } = require('../models');
const { orderSchema } = require('../schemas');

const getAllOrder = async (req, res) => {

    try {
        const order = await Order.find();

        if (!order) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        res.status(200).json({ status: 200, data: order, message: "Order found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getOrderById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid order id" })
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        res.status(200).json({ status: 200, data: order, message: "Order found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createOrder = async (req, res) => {

    try {
        const { value, error } = orderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { status, packageCount, orderType, userId, routeId, stockId, packageId } = value;

        const order = await Order.create({
            status, 
            packageCount, 
            orderType, 
            userId, 
            routeId, 
            stockId, 
            packageId
        });

        if (!order) {
            return res.status(400).json({ message: 'Order cannot create' });
        }

        res.status(201).json({ data: order, message: 'Order created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid order id" });
        }

        const { value, error } = orderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, value, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        res.status(200).json({ status: 200, data: updatedOrder, message: "Order updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid order id" });
        }
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ status: 404, message: "Order not found" });

        }
        res.status(200).json({ status: 200, message: "Order deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder };