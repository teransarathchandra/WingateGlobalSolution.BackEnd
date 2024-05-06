const mongoose = require('mongoose');

const { RestrictedOrder } = require('../models');
const { restrictedOrderSchema } = require('../schemas');
const Country = require('../models/country.model');
//const Category = require('../models/category.model');
//const { sendEmail } = require('../helpers');
//const { emailTemplates } = require('../constants');
const { restrictedOrderAgg } = require('../aggregates');
const { BadRequestError } = require('../helpers');

const getAllRestrictedOrders = async (req, res) => {

    try {
        let restrictedOrder;
        const { type } = req.query;

        if (type == 'restrictedOrderTypes') {
            restrictedOrder = await RestrictedOrder.aggregate(restrictedOrderAgg.restrictedOrderTypes);
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
            return res.status(404).json({ status: 404, message: "Invalid restricted order id. you come get by ID" })
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
            BadRequestError(error);
        }

        const { sendingCountryId, receivingCountryId, categoryId, maxQuantity, exportLicense, importPermit, safetyDataSheets, phytosanitaryCertificate, dangerousGoodsDeclaration } = value;

        const restrictedOrder = await RestrictedOrder.create({
            sendingCountryId,
            receivingCountryId,
            categoryId,
            maxQuantity,
            exportLicense,
            importPermit,
            safetyDataSheets,
            phytosanitaryCertificate,
            dangerousGoodsDeclaration


        });

        if (!restrictedOrder) {
            return res.status(400).json({ message: 'Restricted order cannot create' });
        }

        // await sendEmail({
        //     to: "teran8777@gmail.com",
        //     subject: "Restricted Orders!",
        //     html: emailTemplates.restrictedOrderEmailHTML(restrictedOrder),
        // });

        res.status(201).json({ data: restrictedOrder, message: 'Restricted order created successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateRestrictedOrder = async (req, res) => {
    try {
        let updatedRestrictedOrder;
        const { id } = req.params;
        const { type, ...restrictedOrderData } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid restricted order id" });
        }

        const { value, error } = restrictedOrderSchema.validate(restrictedOrderData);

        if (error) {
            BadRequestError(error);
        }
        updatedRestrictedOrder = await RestrictedOrder.findByIdAndUpdate(id, value, { new: true });

        if (type === 'restrictedOrderTypes') {
            updatedRestrictedOrder = await RestrictedOrder.aggregate(restrictedOrderAgg.restrictedOrderTypesByID(id));  

        //updatedRestrictedOrder = await RestrictedOrder.aggregate(restrictedOrderAgg.restrictedOrderTypes);
            console.log("updated prepared  value ", updatedRestrictedOrder);
        }

        console.log("updated value ", updatedRestrictedOrder);
        
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


const filterRestrictedOrders = async (req, res) => {

    try {
        const { receivingCountryCode, sendingCountryCode, categoryId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(404).json({ status: 404, message: "Invalid category id. " })
        }

        const receivingCountry = await Country.findOne({ countryCode: receivingCountryCode });
        if (!receivingCountry) {
            return res.status(400).json({ status: 400, message: 'Invalid receiving country' });
        }
        const sendingCountry = await Country.findOne({ countryCode: sendingCountryCode });
        if (!sendingCountry) {
            return res.status(400).json({ status: 400, message: 'Invalid sending country' });
        }

        const existingRestrictedOrder = await RestrictedOrder.findOne({
            receivingCountryId: receivingCountry._id,
            sendingCountryId: sendingCountry._id,
            categoryId: categoryId
        });

        if (!existingRestrictedOrder) {
            return res.status(200).json({ status: 200, isRestrictedOrderFound: false, message: "Filtered restricted order not found" })
        }

        res.status(200).json({ status: 200, isRestrictedOrderFound: true, data: existingRestrictedOrder, message: "Filtered restricted order found" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}





module.exports = { getAllRestrictedOrders, getRestrictedOrderById, createRestrictedOrder, updateRestrictedOrder, deleteRestrictedOrder, filterRestrictedOrders };