const express = require('express');
const router = express.Router();

const { orderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, orderController.getAllOrder);
router.get('/:id', isAuthorized, orderController.getOrderById);
router.post('/', isAuthorized, orderController.createOrder);
router.put('/:id', isAuthorized, orderController.updateOrder);
router.delete('/:id', isAuthorized, orderController.deleteOrder);

module.exports = router;