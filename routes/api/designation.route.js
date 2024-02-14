const express = require('express');
const router = express.Router();

const { designationController } = require('../../controllers');

router.get('/', designationController.getAllDesignations)
router.get('/:id', designationController.getDesignationById)
router.post('/', designationController.createDesignation);
router.put('/:id', designationController.updateDesignation);
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;