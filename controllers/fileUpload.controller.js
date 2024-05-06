const { azureBlobService, getBlobSasUrl } = require("../config/azureBlobService.config");

const { FileUpload } = require('../models');
const { fileUploadSchema } = require('../schemas');

const { BadRequestError } = require('../helpers');

const fileUpload = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: 400, message: 'No files were uploaded.' });
    }

    // The name "file" must match the name used in the frontend form
    const file = req.files.file;
    const folderPath = req.body.folderPath;

    // Optional: Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype) || file.size > maxSize) {
        return res.status(400).json({ message: 'Invalid file type or size.' });
    }

    try {

        const uploadResponse = await azureBlobService(file.data, file.name, folderPath);

        const uploadData = {
            type: folderPath,
            folderName: folderPath,
            fileName: file.name,
            url: uploadResponse.url
        };

        const { value, error } = fileUploadSchema.validate(uploadData);

        if (error) {
            BadRequestError(error);
        }

        const upload = new FileUpload(value);
        await upload.save();

        res.status(201).json({ status: 201, data: value, uploadResponse: uploadResponse, message: 'File uploaded successfully' });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send({ status: 500, message: 'Server error' });
    }

};

const getFileUploadBlobSasUrl = async (req, res) => {
    const { containerName, blobName } = req.query;
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

module.exports = { fileUpload, getFileUploadBlobSasUrl };