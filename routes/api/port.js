const express = require('express');
const router = express.Router();

const { createPort, getAllPorts, getPortById, updatePort} = require('../../controller/portController');

router.get('/', getAllPorts)
router.get('/:id', getPortById)
router.post('/', createPort);
router.put('/:id', updatePort);

module.exports = router;