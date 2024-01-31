const express = require('express');
const router = express.Router();

const { getAllVehicles, getvehicleById, createVehicle } =  require('../../controller/vehicleController');

router.get('/', getAllVehicles);
router.get('/:id', getvehicleById);
router.post('/', createVehicle);

module.exports = router;