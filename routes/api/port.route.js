const express = require('express');
const router = express.Router();

const { portController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, portController.getAllPorts)
router.get('/:id', isAuthorized, portController.getPortById)
router.post('/', isAuthorized, portController.createPort);
router.put('/:id', isAuthorized, portController.updatePort);
router.delete('/:id', isAuthorized, portController.deletePort);

module.exports = router;