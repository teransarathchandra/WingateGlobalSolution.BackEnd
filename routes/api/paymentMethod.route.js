const express = require('express');
const router = express.Router();

const { paymentMethodController } = require('../../controllers');

router.get('/', paymentMethodController.getAllPaymentMethods);
router.get('/:id', paymentMethodController.getPaymentMethodById);
router.post('/', paymentMethodController.createPaymentMethod);
router.put('/:id', paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;