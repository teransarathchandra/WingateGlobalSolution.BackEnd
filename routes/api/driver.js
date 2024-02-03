const express = require('express');
const router = express.Router();

const { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver } = require('../../controller/driverController');

router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);

module.exports = router;8