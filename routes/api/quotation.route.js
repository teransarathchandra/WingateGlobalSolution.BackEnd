const express = require('express');
const router = express.Router();

const { quotationController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, quotationController.getAllQuotations);
router.post('/calcamount/:id', isAuthorized, quotationController.calculateQuotation);
router.get('/:id', isAuthorized, quotationController.getQuotationById);
router.post('/', isAuthorized, quotationController.createQuotation);
router.patch('/:id', isAuthorized, quotationController.updateQuotation);
router.delete('/:id', isAuthorized, quotationController.deleteQuotation);

module.exports = router;