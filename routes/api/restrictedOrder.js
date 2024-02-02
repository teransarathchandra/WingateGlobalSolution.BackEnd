const express = require('express');
const router = express.Router();

const { getAllRestrictedOrders, getRestrictedOrderById, createRestrictedOrder, updateRestrictedOrder, deleteRestrictedOrder } = require('../../controller/restrictedOrderController');

router.get('/', getAllRestrictedOrders);
router.get('/:id', getRestrictedOrderById);
router.post('/', createRestrictedOrder);
router.put('/:id', updateRestrictedOrder);
router.delete('/:id', deleteRestrictedOrder);

module.exports = router;
