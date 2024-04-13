const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
const { AZURE_STORAGE_CONNECTION_STRING, CONTAINER_NAME } = process.env;

const azureBlobService = async (fileBuffer, fileName, folderPath) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    // const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const blobName = folderPath ? `${folderPath}/${fileName}` : fileName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: { blobContentType: "auto" } // Automatically set the content type
        });
        return { message: "File uploaded successfully", url: blockBlobClient.url };
    } catch (error) {
        console.error('Error in Azure Blob Service:', error);
        throw new Error('Error uploading to Azure Blob Storage');
    }
};

const getBlobSasUrl = async (containerName, blobName) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const sasOptions = {
        containerName: containerName,
        blobName: blobName,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000),  // Token is valid for 1 hour
        permissions: BlobSASPermissions.parse("r"),  // Permission to only read
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, blobServiceClient.credential).toString();
    return `${blobClient.url}?${sasToken}`;
};

module.exports = { azureBlobService, getBlobSasUrl };