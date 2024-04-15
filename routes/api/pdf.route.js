const express = require('express');
const router = express.Router();

const { pdfController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.post('/', isAuthorized, pdfController.createPDF);

module.exports = router;