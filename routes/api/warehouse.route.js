const express = require('express');
const router = express.Router();

const { wareHouseController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');isAuthorized, 

router.get('/', isAuthorized, wareHouseController.getAllWarehouse);
router.get('/:id', isAuthorized, wareHouseController.getWarehouseById);
router.post('/', isAuthorized, wareHouseController.createWarehouse);
router.put('/:id', isAuthorized, wareHouseController.updateWarehouse);
router.delete('/:id', isAuthorized, wareHouseController.deleteWarehouse);

module.exports = router;