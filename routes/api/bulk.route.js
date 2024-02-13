const express = require('express');
const router = express.Router();

const { getAllBulks, createBulk, getBulkById, updateBulk, deleteBulk} = require('../../controller/bulk.controller');

router.get('/', getAllBulks)
router.get('/:id', getBulkById)
router.post('/', createBulk);
router.put('/:id', updateBulk);
router.delete('/:id', deleteBulk);

module.exports = router;