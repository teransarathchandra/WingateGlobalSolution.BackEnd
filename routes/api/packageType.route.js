const express = require('express');
const router = express.Router();

const { packageTypeController } = require('../../controllers');

router.get('/', packageTypeController.getAllPackageType);
router.get('/:id', packageTypeController.getPackageTypeById);
router.post('/', packageTypeController.createPackageType);
router.put('/:id', packageTypeController.updatePackageType);
router.delete('/:id', packageTypeController.deletePackageType);

module.exports = router;