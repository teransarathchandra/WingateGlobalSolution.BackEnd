const express = require('express');
const router = express.Router();

const { orderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, orderController.getAllOrder);
router.get('/orderTransport', isAuthorized, orderController.getAllOrderTransport);
router.get('/orderInfo', isAuthorized, orderController.getAllOrderInfo);
router.get('/byOrderId', orderController.getOrderByOrderId);
router.get('/:id', isAuthorized, orderController.getOrderById);
router.post('/', isAuthorized, orderController.createOrder);
router.put('/:id', isAuthorized, orderController.updateOrder);
router.put('/updateOrderAndItem/:id', isAuthorized, orderController.updateOrderAndItem);
router.delete('/:id', isAuthorized, orderController.deleteOrder);

module.exports = router;