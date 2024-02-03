const express = require('express');
const router = express.Router();

const { createPort, getAllPorts, getPortById, updatePort, deletePort} = require('../../controller/portController');

router.get('/', getAllPorts)
router.get('/:id', getPortById)
router.post('/', createPort);
router.put('/:id', updatePort);
router.delete('/:id', deletePort);

module.exports = router;