const express = require('express');
const router = express.Router();

const { restrictedOrderController } = require('../../controllers');

router.get('/', restrictedOrderController.getAllRestrictedOrders);
router.get('/:id', restrictedOrderController.getRestrictedOrderById);
router.post('/', restrictedOrderController.createRestrictedOrder);
router.put('/:id', restrictedOrderController.updateRestrictedOrder);
router.delete('/:id', restrictedOrderController.deleteRestrictedOrder);

module.exports = router;
