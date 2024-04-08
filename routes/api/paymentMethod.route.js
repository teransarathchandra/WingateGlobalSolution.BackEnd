const express = require('express');
const router = express.Router();

const { paymentMethodController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, paymentMethodController.getAllPaymentMethods);
router.get('/:id', isAuthorized, paymentMethodController.getPaymentMethodById);
router.post('/', isAuthorized, paymentMethodController.createPaymentMethod);
router.put('/:id', isAuthorized, paymentMethodController.updatePaymentMethod);
router.delete('/:id', isAuthorized, paymentMethodController.deletePaymentMethod);

module.exports = router;