const express = require('express');
const router = express.Router();

const { getAllVehicles, getvehicleById, createVehicle, updateVehicle } =  require('../../controller/vehicleController');

router.get('/', getAllVehicles);
router.get('/:id', getvehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);

module.exports = router;