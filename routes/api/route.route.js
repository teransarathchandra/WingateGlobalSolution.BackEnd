const express = require('express');
const router = express.Router();

const { routeController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, routeController.getAllRoutes);
router.get('/:id', isAuthorized, routeController.getRouteById);
router.post('/', isAuthorized, routeController.createRoute);
router.put('/:id', isAuthorized, routeController.updateRoute);
router.delete('/:id', isAuthorized, routeController.deleteRoute);

module.exports = router;