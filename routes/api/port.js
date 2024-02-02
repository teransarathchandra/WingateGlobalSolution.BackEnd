const express = require('express');
const router = express.Router();

const { createPort, getAllPorts, getPortById} = require('../../controller/portController');

router.get('/', getAllPorts)
router.get('/:id', getPortById)
router.post('/', createPort);

module.exports = router;