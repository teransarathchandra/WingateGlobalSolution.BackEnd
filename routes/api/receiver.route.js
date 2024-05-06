const express = require('express');
const router = express.Router();

const { receiverController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, receiverController.getAllReceiver);
router.get('/:id', isAuthorized, receiverController.getReceiverById);
router.post('/', isAuthorized, receiverController.createReceiver);
router.put('/:id', isAuthorized, receiverController.updateReceiver);
router.delete('/:id', isAuthorized, receiverController.deleteReceiver);

module.exports = router;