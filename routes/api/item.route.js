const express = require('express');
const router = express.Router();

const { itemController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, itemController.getAllItems);
router.get('/:id', isAuthorized, itemController.getItemById);
router.post('/', isAuthorized, itemController.createItem);
router.put('/:id', isAuthorized, itemController.updateItem);
router.delete('/:id', isAuthorized, itemController.deleteItem);

module.exports = router;