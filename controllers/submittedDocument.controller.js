const mongoose = require('mongoose');
const { azureBlobService, getBlobSasUrl } = require("../config/azureBlobService.config");
const {restrictedOrderAgg} = require('../aggregates');
const { SubmittedDocument } = require('../models');
const { submittedDocumentSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllSubmittedDocuments = async (req, res) => {

    try {
        let submittedDocuments;
        const { itemId } = req.params;
       // const { type } = req.query;

        if( itemId ){
            submittedDocuments = await SubmittedDocument.aggregate(restrictedOrderAgg.restrictedOrderDocumentsByID(itemId));
        } else {
            submittedDocuments = await SubmittedDocument.find();
        }


        if (!submittedDocuments ||  submittedDocuments.length === 0) {
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

const documentUpload = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: 400, message: 'No files were uploaded.' });
    }

    // The name "file" must match the name used in the frontend form
    const file = req.files.file;
    const itemId = req.body.itemId;
    const folderPath = req.body.folderPath;
    const documentType = req.body.documentType;

    // Modify the file name to include itemId
    const modifiedFileName = `${file.name.split('.').slice(0, -1).join('.')}_${itemId}.${file.name.split('.').pop()}`;
 
    // Construct the folder path to include both folderPath and documentType
    // const fullPath = `${folderPath}/${documentType}`;

    // file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype) || file.size > maxSize) {
        return res.status(400).json({ message: 'Invalid file type or size.' });
    }

    try {

        const uploadResponse = await azureBlobService(file.data, modifiedFileName, folderPath);

        const uploadData = {
            documentName: file.name,
            documentType: documentType,
            folderName: folderPath,
            documentPath: uploadResponse.url,
            referenceId: itemId,
        };

        const { value, error } = submittedDocumentSchema.validate(uploadData);

        if (error) {
            BadRequestError(error);
        }

        const upload = new SubmittedDocument(value);
        await upload.save();

        res.status(201).json({ status: 201, data: value, uploadResponse: uploadResponse, message: 'File uploaded successfully' });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send({ status: 500, message: 'Server error' });
    }

};
const getDocumentBlobSasUrl = async (req, res) => {

    const {blobName} = req.params;
    const { containerName } = req.query;

    if (!containerName || !blobName) {
        return res.status(400).json({ message: 'Container name and blob name are required.' });
    }

    try {
        const url = await getBlobSasUrl(containerName, blobName);
        res.status(200).json({ url });
        
    } catch (error) {
        console.error('Error generating SAS URL:', error);
        res.status(500).json({ message: 'Failed to generate SAS URL', error: error.message });
    }
};

module.exports = { getAllSubmittedDocuments, getSubmittedDocumentById, createSubmittedDocument, updateSubmittedDocument, deleteSubmittedDocument, getDocumentBlobSasUrl, documentUpload };