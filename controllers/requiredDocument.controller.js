const mongoose = require('mongoose');

const { RequiredDocument } = require('../models');
const { requiredDocumentSchema } = require('../schemas');

const getAllRequiredDocuments = async (req, res) => {

    try {
        const requiredDocuments = await RequiredDocument.find();

        if (!requiredDocuments) {
            return res.status(404).json({ status: 404, message: "Required documents not found" });
        }

        res.status(200).json({ status: 200, data: requiredDocuments, message: "Required documents found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getRequiredDocumentById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid required document id" })
        }

        const requiredDocument = await RequiredDocument.findById(id);

        if (!requiredDocument) {
            return res.status(404).json({ status: 404, message: "Required document not found" });
        }

        res.status(200).json({ status: 200, data: requiredDocument, message: "Required document found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createRequiredDocument = async (req, res) => {

    try {
        const { value, error } = requiredDocumentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { documentType, documentPath, itemId } = value;

        const requiredDocument = await RequiredDocument.create({
            documentType,
            documentPath,
            itemId
        });

        if (!requiredDocument) {
            return res.status(400).json({ message: 'Required document cannot create' });
        }

        res.status(201).json({ data: requiredDocument, message: 'Required document created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateRequiredDocument = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid required document id" });
        }

        const { value, error } = requiredDocumentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedRequiredDocument = await RequiredDocument.findByIdAndUpdate(id, value, { new: true });

        if (!updatedRequiredDocument) {
            return res.status(404).json({ status: 404, message: "Required document not found" });
        }

        res.status(200).json({ status: 200, data: updatedRequiredDocument, message: "Required document updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteRequiredDocument = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid required document id" });
        }
        const deletedRequiredDocument = await RequiredDocument.findByIdAndDelete(id);

        if (!deletedRequiredDocument) {
            return res.status(404).json({ status: 404, message: "Required document not found" });

        }
        res.status(200).json({ status: 200, message: "Required document deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllRequiredDocuments, getRequiredDocumentById, createRequiredDocument, updateRequiredDocument, deleteRequiredDocument };