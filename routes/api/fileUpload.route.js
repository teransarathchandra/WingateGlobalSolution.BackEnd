const express = require('express');
const router = express.Router();

const { fileUploadController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.post('/', isAuthorized, fileUploadController.fileUpload);
router.get('/getBlobSasUrl', isAuthorized, fileUploadController.getFileUploadBlobSasUrl);

module.exports = router;