const express = require('express');
const router = express.Router();

const { salesController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');isAuthorized, 

router.get('/', isAuthorized, salesController.getAllSales);
router.get('/:id', isAuthorized, salesController.getSalesById);
router.post('/', isAuthorized, salesController.createSales);
router.put('/:id', isAuthorized, salesController.updateSales);
router.delete('/:id', isAuthorized, salesController.deleteSales);

module.exports = router;