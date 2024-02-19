const express = require('express');
const router = express.Router();

const { commercialInvoiceController } = require('../../controllers');

router.get('/', commercialInvoiceController.getAllCommercialInvoice);
router.get('/:id', commercialInvoiceController.getCommercialInvoiceById);
router.post('/', commercialInvoiceController.createCommercialInvoice);
router.put('/:id', commercialInvoiceController.updateCommercialInvoice);
router.delete('/:id', commercialInvoiceController.deleteCommercialInvoice);

module.exports = router;