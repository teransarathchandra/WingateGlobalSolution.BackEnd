const express = require('express');
const router = express.Router();

const { receiverController } = require('../../controllers');

router.get('/', receiverController.getAllReceiver);
router.get('/:id', receiverController.getReceiverById);
router.post('/', receiverController.createReceiver);
router.put('/:id', receiverController.updateReceiver);
router.delete('/:id', receiverController.deleteReceiver);

module.exports = router;