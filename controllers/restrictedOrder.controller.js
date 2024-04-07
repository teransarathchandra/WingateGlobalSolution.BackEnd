const mongoose = require('mongoose');

const { RestrictedOrder } = require('../models');
const { restrictedOrderSchema } = require('../schemas');
//const { sendEmail } = require('../helpers');
const { emailTemplates } = require('../constants');
const { restrictedOrderAgg } = require('../aggregates');

const getAllRestrictedOrders = async (req, res) => {

    try {
        let restrictedOrder;
        const { type } = req.query;
        
        if (type == 'countryNames') {
            restrictedOrder = await RestrictedOrder.aggregate(restrictedOrderAgg.aggTypeOne);
        } else {
            restrictedOrder = await RestrictedOrder.find();
        }

        

        if (!restrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted orders not found" });
        }

        res.status(200).json({ status: 200, data: restrictedOrder, message: "Restricted orders found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getRestrictedOrderById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid restricted order id" })
        }

        const restrictedOrder = await RestrictedOrder.findById(id);

        if (!restrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted order not found" });
        }

        res.status(200).json({ status: 200, data: restrictedOrder, message: "Restricted order found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createRestrictedOrder = async (req, res) => {

    try {
        const { value, error } = restrictedOrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
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
            return res.status(400).json({ message: 'Restricted order cannot create' });
        }

        // await sendEmail({
        //     to: "teran8777@gmail.com",
        //     subject: "Restricted Orders!",
        //     html: emailTemplates.restrictedOrderEmailHTML(restrictedOrder),
        // });

        res.status(201).json({ data: restrictedOrder, message: 'Restricted order created sccessfully' });
        
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateRestrictedOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid restricted order id" });
        }

        const { value, error } = restrictedOrderSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedRestrictedOrder = await RestrictedOrder.findByIdAndUpdate(id, value, { new: true });

        if (!updatedRestrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted order not found" });
        }

        res.status(200).json({ status: 200, data: updatedRestrictedOrder, message: "Restricted order updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteRestrictedOrder = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid restricted order id" });
        }
        const deletedRestrictedOrder = await RestrictedOrder.findByIdAndDelete(id);

        if (!deletedRestrictedOrder) {
            return res.status(404).json({ status: 404, message: "Restricted order not found" });

        }
        res.status(200).json({ status: 200, message: "Restricted order deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllRestrictedOrders, getRestrictedOrderById, createRestrictedOrder, updateRestrictedOrder, deleteRestrictedOrder };