const express = require('express');
const router = express.Router();

const { bulkController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, bulkController.getAllBulks);
router.get('/lastadded', isAuthorized, bulkController.getLastAddedBulk)
router.get('/:id', isAuthorized, bulkController.getBulkById);
router.post('/', isAuthorized, bulkController.createBulk);
router.patch('/:id', isAuthorized, bulkController.updateBulk);
router.delete('/:id', isAuthorized, bulkController.deleteBulk);

module.exports = router;