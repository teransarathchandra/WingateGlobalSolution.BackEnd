const express = require('express');
const router = express.Router();

const { salesController } = require('../../controllers');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesController.createSales);
router.put('/:id', salesController.updateSales);
router.delete('/:id', salesController.deleteSales);

module.exports = router;