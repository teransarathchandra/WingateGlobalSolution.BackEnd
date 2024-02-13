const express = require('express');
const router = express.Router();

const { getAllQuotations, getQuotationById, createQuotation, updateQuotation, deleteQuotation } = require('../../controller/quotation.controller');
router.get('/', getAllQuotations);
router.get('/:id', getQuotationById);
router.post('/', createQuotation);
router.put('/:id', updateQuotation);
router.delete('/:id', deleteQuotation);

module.exports = router;