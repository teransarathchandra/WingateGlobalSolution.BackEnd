const express = require('express');
const router = express.Router();

const { bulkController } = require('../../controllers');

router.get('/', bulkController.getAllBulks)
router.get('/:id', bulkController.getBulkById)
router.post('/', bulkController.createBulk);
router.put('/:id', bulkController.updateBulk);
router.delete('/:id', bulkController.deleteBulk);

module.exports = router;