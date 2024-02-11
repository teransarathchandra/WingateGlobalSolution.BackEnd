const mongoose = require('mongoose');

const RequiredDocument = require('../models/requiredDocument.model');
const RequiredDocumentSchema = require('../schemas/requiredDocument.schema');

const getAllRequiredDocuments = async (req, res) => {

    try {
        const requiredDocuments = await RequiredDocument.find();

        if (!requiredDocuments) {
            return res.status(404).json({ status: 404, message: "Required Documents Not Found" });
        }

        res.status(200).json({ status: 200, data: requiredDocuments, message: "Required Documents Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getRequiredDocumentById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Required Document Id" })
        }

        const requiredDocument = await RequiredDocument.findById(id);

        if (!requiredDocument) {
            return res.status(404).json({ status: 404, message: "Required Document Not Found" });
        }

        res.status(200).json({ status: 200, data: requiredDocument, message: "Required Document Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createRequiredDocument = async (req, res) => {

    try {
        const { value, error } = RequiredDocumentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { requiredDocumentId, documentType, documentPath, itemId } = value;

        const requiredDocument = await RequiredDocument.create({
            requiredDocumentId,
            documentType,
            documentPath,
            itemId
        });

        if (!requiredDocument) {
            return res.status(400).json({ message: 'Required Document Cannot Create' });
        }

        res.status(201).json({ data: requiredDocument, message: 'Required Document Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateRequiredDocument = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Required Document id" });
        }

        const { value, error } = RequiredDocumentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedRequiredDocument = await RequiredDocument.findByIdAndUpdate(id, value, { new: true });

        if (!updatedRequiredDocument) {
            return res.status(404).json({ status: 404, message: "Required Document not found" });
        }

        res.status(200).json({ status: 200, data: updatedRequiredDocument, message: "Required Document Updated Successfully" });


    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

const deleteRequiredDocument = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Required Document id" });
        }
        const deletedRequiredDocument = await RequiredDocument.findByIdAndDelete(id);

        if (!deletedRequiredDocument) {
            return res.status(404).json({ status: 404, message: "Required Document not found" });

        }
        res.status(200).json({ status: 200, message: "Required Document Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

};

module.exports = { getAllRequiredDocuments, getRequiredDocumentById, createRequiredDocument, updateRequiredDocument, deleteRequiredDocument };