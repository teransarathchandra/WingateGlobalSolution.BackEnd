const express = require('express');
const router = express.Router();

const { commercialInvoiceController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, commercialInvoiceController.getAllCommercialInvoice);
router.get('/:id', isAuthorized, commercialInvoiceController.getCommercialInvoiceById);
router.post('/', isAuthorized, commercialInvoiceController.createCommercialInvoice);
router.put('/:id', isAuthorized, commercialInvoiceController.updateCommercialInvoice);
router.delete('/:id', isAuthorized, commercialInvoiceController.deleteCommercialInvoice);

module.exports = router;