const express = require('express');
const router = express.Router();

const { flightController } = require('../../controllers');

router.get('/', flightController.getAllFlights)
router.get('/:id', flightController.getFlightById)
router.post('/', flightController.createFlight);
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);


module.exports = router;