const express = require('express');
const router = express.Router();

const { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } = require('../../controller/payment.controller');

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;