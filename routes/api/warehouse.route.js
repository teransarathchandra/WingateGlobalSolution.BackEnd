const express = require('express');
const router = express.Router();

const { wareHouseController } = require('../../controllers');

router.get('/', wareHouseController.getAllWarehouse);
router.get('/:id', wareHouseController.getWarehouseById);
router.post('/', wareHouseController.createWarehouse);
router.put('/:id', wareHouseController.updateWarehouse);
router.delete('/:id', wareHouseController.deleteWarehouse);

module.exports = router;