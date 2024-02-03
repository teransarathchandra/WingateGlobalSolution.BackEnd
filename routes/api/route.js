const express = require('express');
const router = express.Router();

const { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute } = require('../../controller/routeController');

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', createRoute);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

module.exports = router;