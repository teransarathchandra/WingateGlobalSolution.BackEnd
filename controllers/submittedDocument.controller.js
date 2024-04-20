const mongoose = require('mongoose');

const { SubmittedDocument } = require('../models');
const { submittedDocumentSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllSubmittedDocuments = async (req, res) => {

    try {
        const submittedDocuments = await SubmittedDocument.find();
        
        if (!submittedDocuments) {
            return res.status(404).json({ status: 404, message: "Submitted Documents not found" });
        }

        res.status(200).json({ status: 200, data: submittedDocuments, message: "Submitted Documents found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getSubmittedDocumentById = async (req, res) => {

    try {
        
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid submitted Document id" })
        }

        const submittedDocument = await SubmittedDocument.findById(id);

        if (!submittedDocument) {
            return res.status(404).json({ status: 404, message: "Submitted Document not found" });
        }

        res.status(200).json({ status: 200, data: submittedDocument, message: "Submitted Document found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createSubmittedDocument = async (req, res) => {

    try {
        const { value, error } = submittedDocumentSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { documentType, documentPath, itemId } = value;

        const submittedDocument = await SubmittedDocument.create({
            documentType,
            documentPath,
            itemId
        });

        if (!submittedDocument) {
            return res.status(400).json({ message: 'Submitted Document cannot create' });
        }

        res.status(201).json({ data: submittedDocument, message: 'Submitted Document created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateSubmittedDocument = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid submitted Document id" });
        }

        const { value, error } = submittedDocumentSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedSubmittedDocument = await SubmittedDocument.findByIdAndUpdate(id, value, { new: true });

        if (!updatedSubmittedDocument) {
            return res.status(404).json({ status: 404, message: "Submitted Document not found" });
        }

        res.status(200).json({ status: 200, data: updatedSubmittedDocument, message: "Submitted Document updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteSubmittedDocument = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid submitted Document id" });
        }
        const deletedSubmittedDocument = await SubmittedDocument.findByIdAndDelete(id);

        if (!deletedSubmittedDocument) {
            return res.status(404).json({ status: 404, message: "Submitted Document not found" });

        }
        res.status(200).json({ status: 200, message: "Submitted Document deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllSubmittedDocuments, getSubmittedDocumentById, createSubmittedDocument, updateSubmittedDocument, deleteSubmittedDocument };