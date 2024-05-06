const express = require('express');
const router = express.Router();

const { packageTypeController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, packageTypeController.getAllPackageType);
router.get('/:id', isAuthorized, packageTypeController.getPackageTypeById);
router.post('/', isAuthorized, packageTypeController.createPackageType);
router.put('/:id', isAuthorized, packageTypeController.updatePackageType);
router.delete('/:id', isAuthorized, packageTypeController.deletePackageType);

module.exports = router;