const express = require('express');
const router = express.Router();

const { vehicleController } =  require('../../controllers');
const { isAuthorized } = require('../../middlewares');isAuthorized, 

router.get('/', isAuthorized, vehicleController.getAllVehicles);
router.get('/:id', isAuthorized, vehicleController.getVehicleById);
router.post('/', isAuthorized, vehicleController.createVehicle);
router.put('/:id', isAuthorized, vehicleController.updateVehicle);
router.delete('/:id', isAuthorized, vehicleController.deleteVehicle);

module.exports = router;