const express = require('express');
const router = express.Router();

const { quotationController } = require('../../controllers');
router.get('/', quotationController.getAllQuotations);
router.get('/:id', quotationController.getQuotationById);
router.post('/', quotationController.createQuotation);
router.put('/:id', quotationController.updateQuotation);
router.delete('/:id', quotationController.deleteQuotation);

module.exports = router;