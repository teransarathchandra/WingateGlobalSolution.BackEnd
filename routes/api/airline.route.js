const express = require('express');
const router = express.Router();

const { airlineController } = require('../../controllers');

router.get('/', airlineController.getAllAirlines)
router.get('/:id', airlineController.getAirlineById)
router.post('/', airlineController.createAirline);
router.put('/:id', airlineController.updateAirline);
router.delete('/:id', airlineController.deleteAirline);

module.exports = router;