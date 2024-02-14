const mongoose = require('mongoose');

const { RestrictedOrder } = require('../models');
const { restrictedOrderSchema } = require('../schemas');
const { sendEmail } = require('../helpers');
const { emailTemplates } = require('../constants');

const getAllRestrictedOrders = async (req, res) => {

    try {
        const restrictedOrder = await RestrictedOrder.find();

        if (!restrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted Orders Not Found" });
        }

        res.status(200).json({ status: 200, data: restrictedOrder, message: "Restricted Orders Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getRestrictedOrderById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Restricted Order Id" })
        }

        const restrictedOrder = await RestrictedOrder.findById(id);

        if (!restrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted Order Not Found" });
        }

        res.status(200).json({ status: 200, data: restrictedOrder, message: "Restricted Order Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createRestrictedOrder = async (req, res) => {

    try {
        const { value, error } = restrictedOrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { maxQuantity, exportLicense, importPermit, safetyDataSheets, phytosanitaryCertificate, dangerousGoodsDeclaration, categoryId, sendingCountryId, receivingCountryId } = value;

        const restrictedOrder = await RestrictedOrder.create({
            maxQuantity,
            exportLicense,
            importPermit,
            safetyDataSheets,
            phytosanitaryCertificate,
            dangerousGoodsDeclaration,
            categoryId,
            sendingCountryId,
            receivingCountryId
        });

        if (!restrictedOrder) {
            return res.status(400).json({ message: 'Restricted Order Cannot Create' });
        }

        await sendEmail({
            to: "teran8777@gmail.com",
            subject: "Restricted Orders!",
            html: emailTemplates.restrictedOrderEmailHTML(restrictedOrder),
        });

        res.status(201).json({ data: restrictedOrder, message: 'Restricted Order Created Successfully' });
        
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateRestrictedOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Restricted Order id" });
        }

        const { value, error } = restrictedOrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedRestrictedOrder = await RestrictedOrder.findByIdAndUpdate(id, value, { new: true });

        if (!updatedRestrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted Order not found" });
        }

        res.status(200).json({ status: 200, data: updatedRestrictedOrder, message: "Restricted Order Updated Successfully" });


    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

const deleteRestrictedOrder = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid restricted Order id" });
        }
        const deletedRestrictedOrder = await RestrictedOrder.findByIdAndDelete(id);

        if (!deletedRestrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted Order not found" });

        }
        res.status(200).json({ status: 200, message: "Restricted Order Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

};

module.exports = { getAllRestrictedOrders, getRestrictedOrderById, createRestrictedOrder, updateRestrictedOrder, deleteRestrictedOrder };