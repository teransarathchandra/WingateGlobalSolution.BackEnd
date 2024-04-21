const mongoose = require('mongoose');

const { Order } = require('../models');
const { orderSchema } = require('../schemas');
const { orderAgg, transportAgg , restrictedOrderAgg} = require('../aggregates');
const { BadRequestError } = require('../helpers');


const getAllOrder = async (req, res) => {

    try {
        let order
        const { type } = req.query;

        if (type == 'orderIds') {
            order = await Order.aggregate(orderAgg.aggType);
        } else if (type == 'restrictedOrders') {
            order = await Order.aggregate(restrictedOrderAgg.restrictedOrders);
        } else {
            order = await Order.find();
        }

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

const getAllOrderTransport = async (req, res) => {

    try {
        let order
        const { type } = req.query;

        if (type == 'orderIds') {
            order = await Order.aggregate(transportAgg.aggOrders);
        } else {
            order = await Order.find();
        }

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
const getAllOrderInfo = async (req, res) => {

    try {
        let order
        const { type } = req.query;

        if (type == 'orderInfoIds') {
            order = await Order.aggregate(transportAgg.aggOrderInfo);
        } else {
            order = await Order.find();
        }

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

const getOrderByOrderId = async (req, res) => {
    try {
        const { orderId } = req.query;

        const aggregationPipeline = transportAgg.getOrdersByOrderIds(orderId);

        const order = await Order.aggregate(aggregationPipeline);

        if (!order || order.length === 0) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        // Send only the first element of the array as an object
        res.status(200).json({ status: 200, data: order[0], message: "Order found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createOrder = async (req, res) => {

    try {

        const user = req.user || req.employee;
        if (!user) {
            return res.status(403).json({ message: "User information is missing" });
        }

        const { value, error } = orderSchema.createOrderJoiSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { status, packageCount, stockId, packageId, bulkdId, paymentId, invoiceId, itemId, senderId, receiverId, quotationId, isPickupOrder, pickupDate, priority } = value;

        const order = await Order.create({
            status,
            packageCount,
            userId: user._id,
            stockId,
            packageId,
            bulkdId,
            paymentId,
            invoiceId,
            itemId,
            senderId,
            receiverId,
            quotationId,
            isPickupOrder,
            pickupDate,
            priority
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

        const { value, error } = orderSchema.updateOrderJoiSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedOrder = await Order.findByIdAndUpdate({ _id: id }, value, { new: true });

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

module.exports = { getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder, getAllOrderTransport, getAllOrderInfo, getOrderByOrderId };