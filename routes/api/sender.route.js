const express = require('express');
const router = express.Router();

const { senderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, senderController.getAllSender);
router.get('/:id', isAuthorized, senderController.getSenderById);
router.post('/', isAuthorized, senderController.createSender);
router.put('/:id', isAuthorized, senderController.updateSender);
router.delete('/:id', isAuthorized, senderController.deleteSender);

module.exports = router;