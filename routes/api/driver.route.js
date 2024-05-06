const express = require('express');
const router = express.Router();

const { driverController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, driverController.getAllDrivers);
router.get('/:id', isAuthorized, driverController.getDriverById);
router.post('/', isAuthorized, driverController.createDriver);
router.put('/:id', isAuthorized, driverController.updateDriver);
router.delete('/:id', isAuthorized, driverController.deleteDriver);

module.exports = router;8