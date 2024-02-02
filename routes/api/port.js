const express = require('express');
const router = express.Router();

const { createPort } = require('../../controller/portController');

router.post('/', createPort);

module.exports = router;