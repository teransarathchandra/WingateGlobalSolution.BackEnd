const express = require('express');
const router = express.Router();

const { createPort, getAllPorts} = require('../../controller/portController');

router.get('/', getAllPorts)
router.post('/', createPort);

module.exports = router;