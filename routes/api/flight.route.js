const express = require('express');
const router = express.Router();

const { flightController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, flightController.getAllFlights)
router.get('/:id', isAuthorized, flightController.getFlightById)
router.post('/', isAuthorized, flightController.createFlight);
router.put('/:id', isAuthorized, flightController.updateFlight);
router.delete('/:id', isAuthorized, flightController.deleteFlight);


module.exports = router;