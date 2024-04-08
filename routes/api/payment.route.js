const express = require('express');
const router = express.Router();

const { paymentController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, paymentController.getAllPayments);
router.get('/:id', isAuthorized, paymentController.getPaymentById);
router.post('/', isAuthorized, paymentController.createPayment);
router.put('/:id', isAuthorized, paymentController.updatePayment);
router.delete('/:id', isAuthorized, paymentController.deletePayment);

module.exports = router;