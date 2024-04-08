const express = require('express');
const router = express.Router();

const { restrictedOrderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, restrictedOrderController.getAllRestrictedOrders);
router.get('/:id', isAuthorized, restrictedOrderController.getRestrictedOrderById);
router.post('/', isAuthorized, restrictedOrderController.createRestrictedOrder);
router.patch('/:id', isAuthorized, restrictedOrderController.updateRestrictedOrder);
router.delete('/:id', isAuthorized, restrictedOrderController.deleteRestrictedOrder);

module.exports = router;
