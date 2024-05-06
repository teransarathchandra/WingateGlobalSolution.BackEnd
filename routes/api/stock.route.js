const express = require('express');
const router = express.Router();

const { stockController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, stockController.getAllStocks);
router.get('/:id', isAuthorized, stockController.getStockById);
router.post('/', isAuthorized, stockController.createStock);
router.put('/:id', isAuthorized, stockController.updateStock);
router.delete('/:id', isAuthorized, stockController.deleteStock);

module.exports = router;