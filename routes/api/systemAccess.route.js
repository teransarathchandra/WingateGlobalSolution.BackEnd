const express = require('express');
const router = express.Router();

const { systemAccessController } = require('../../controllers');

router.get('/', systemAccessController.getAllSystemAccess)
router.get('/:id', systemAccessController.getSystemAccessById)
router.post('/', systemAccessController.createSystemAccess);
router.put('/:id', systemAccessController.updateSystemAccess);
router.delete('/:id', systemAccessController.deleteSystemAccess);

module.exports = router;