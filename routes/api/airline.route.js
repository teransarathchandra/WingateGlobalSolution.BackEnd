const express = require('express');
const router = express.Router();

const { airlineController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, airlineController.getAllAirlines)
router.get('/:id', isAuthorized, airlineController.getAirlineById)
router.post('/', isAuthorized, airlineController.createAirline);
router.put('/:id', isAuthorized, airlineController.updateAirline);
router.delete('/:id', isAuthorized, airlineController.deleteAirline);

module.exports = router;