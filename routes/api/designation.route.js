const express = require('express');
const router = express.Router();

const { designationController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, designationController.getAllDesignations)
router.get('/:id', isAuthorized, designationController.getDesignationById)
router.post('/', isAuthorized, designationController.createDesignation);
router.put('/:id', isAuthorized, designationController.updateDesignation);
router.delete('/:id', isAuthorized, designationController.deleteDesignation);

module.exports = router;