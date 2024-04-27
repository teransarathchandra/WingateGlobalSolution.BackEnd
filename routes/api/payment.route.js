const express = require('express');
const router = express.Router();

const { paymentController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, paymentController.getAllPayments);
router.get('/payment-details', paymentController.getPaymentDetails);
router.get('/:id', isAuthorized, paymentController.getPaymentById);
router.post('/', isAuthorized, paymentController.createPayment);
router.put('/:id', isAuthorized, paymentController.updatePayment);
router.delete('/:id', isAuthorized, paymentController.deletePayment);
router.post('/notify', paymentController.paymentNotify);
router.post('/generate_hash', paymentController.generateHash);
router.post('/access-token', paymentController.getAccessToken);

module.exports = router;