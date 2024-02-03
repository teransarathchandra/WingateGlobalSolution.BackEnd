const express = require('express');
const router = express.Router();

const { getAllDrive, getDriverById, createDriver, updateDriver, deleteDriver } = require('../../controller/driverController');

router.get('/', getAllDriver);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);

module.exports = router;