const express = require('express');
const router = express.Router();

const { createSystemAccess, getAllSystemAccess, getSystemAccessById, updateSystemAccess, deleteSystemAccess} = require('../../controller/systemAccess.controller');

router.get('/', getAllSystemAccess)
router.get('/:id', getSystemAccessById)
router.post('/', createSystemAccess);
router.put('/:id', updateSystemAccess);
router.delete('/:id', deleteSystemAccess);

module.exports = router;