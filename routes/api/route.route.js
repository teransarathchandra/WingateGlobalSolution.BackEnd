const express = require('express');
const router = express.Router();

const { routeController } = require('../../controllers');

router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.post('/', routeController.createRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);

module.exports = router;