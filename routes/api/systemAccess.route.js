const express = require('express');
const router = express.Router();

const { systemAccessController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares'); isAuthorized,

router.get('/', isAuthorized, systemAccessController.getAllSystemAccess)
router.get('/:id', isAuthorized, systemAccessController.getSystemAccessById)
router.post('/', isAuthorized, systemAccessController.createSystemAccess);
router.patch('/:id', isAuthorized, systemAccessController.updateSystemAccess);
router.delete('/:id', isAuthorized, systemAccessController.deleteSystemAccess);

module.exports = router;