const express = require('express');
const router = express.Router();

const { orderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, orderController.getAllOrder);
router.get('/orderTransport', isAuthorized, orderController.getAllOrderTransport);
router.get('/orderInfo', isAuthorized, orderController.getAllOrderInfo);
router.get('/:id', isAuthorized, orderController.getOrderById); // Changed to '/byObjectId/:id'
router.get('/byOrderId/:orderId', isAuthorized, orderController.getOrderByOrderId);
router.post('/', isAuthorized, orderController.createOrder);
router.put('/:id', isAuthorized, orderController.updateOrder);
router.delete('/:id', isAuthorized, orderController.deleteOrder);

module.exports = router;