const express = require('express');
const router = express.Router();

const { getAllWarehouse, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse } = require('../../controller/warehouse.controller');

router.get('/', getAllWarehouse);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;