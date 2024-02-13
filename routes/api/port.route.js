const express = require('express');
const router = express.Router();

const { portController } = require('../../controllers');

router.get('/', portController.getAllPorts)
router.get('/:id', portController.getPortById)
router.post('/', portController.createPort);
router.put('/:id', portController.updatePort);
router.delete('/:id', portController.deletePort);

module.exports = router;